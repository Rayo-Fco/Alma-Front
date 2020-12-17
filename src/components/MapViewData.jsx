import React, { useState, useEffect } from 'react'
import { Map, TileLayer, Polygon, Marker, ZoomControl } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { sendCommunes } from '../actions/communesAction'
import { connect } from 'react-redux'
import { selectActiveCommunes } from '../reducers/communesReducer'
import { IconAlert, IconCheckin } from './IconLocation'
import { useLocation } from 'wouter'
import LocateControl from './LocateControl'
import axios from 'axios'
import { CircularProgress, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, makeStyles, Paper, Table } from '@material-ui/core'
import api from '../services/api'

const mapStateToProps = state => {
    return {
        communes: selectActiveCommunes(state)
    }
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
    },
    gr: {
        marginTop: theme.spacing(3),

    },
    paper: {
        height: '92%',
        backgroundColor: '#e0dfdf',
        marginRight: '15px'
    },
    dtpick: {
        marginLeft: 60,
    },
    btn: {
        marginTop: 15,
        marginLeft: 20,
    },
    pap: {
        marginTop: theme.spacing(2),
        height: 800,
    },
    grpap: {
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),
        width: '100%',
        marginLeft: theme.spacing(0),
    },
    input: {
        marginBottom: theme.spacing(2),
        width: '100%'
    },
    gridform: {
        margin: 'auto',
        height: '100%',
        width: '80%',
        maxWidth: 500,
        marginBottom: 30
    },
    paperform: {
        marginTop: theme.spacing(3),
        height: '80'
    },
    formControl: {
        minWidth: 120,
    },
    typo: {
        fontFamily: 'helvetica',
        fontSize: 36,
    },
    progress: {
        height: '80%',
        width: '80%',
        paddingTop: '15%',
        paddingBottom: '15%',
        paddingLeft: '15%'

    },
    circular: {
        color: '#fd9eef'
    },
    alert: {
        textAlign: 'left'
    }
}))
function createData(name, info) {
    return { name, info }
}
function MapViewData({ communes }) {
    const classes = useStyles()
    const [, navigate] = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const [rows, setRows] = useState([])
    const [coordinates, setCoordinates] = useState([])
    const [coordinatesAlert, setCoordinatesAlert] = useState({ coorAlert: [] })
    const [coordinatesCheckin, setCoordinatesCheckin] = useState({ coorCheckin: [] })

    const [state2, setState2] = useState({
        currentLocation: { lat: 0, lng: 0 },
    })

    useEffect(() => {
        const ac = new AbortController()
        window.scrollTo(0, 0)
        let isMounted = true
        let qtyC = 0
        let qtyA = 0

        let currentLocation = {
            lat: -33.4595661,
            lng: -70.6508881
        }
        if (communes === '') {
            navigate('/')

            return function () {
                ac.abort()
            }

        }

        const token = window.sessionStorage.getItem('tokenadmin')
        const communeN = {
            comuna: communes
        }
        let arrayCoordinates = []
        let arrayCoordinatesCheckin = []
        let arrayCoordinatesAlert = []
        const query = async () => {
            await api.post(`/comuna/coordinates`, communeN, {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then(res => {
                    if (isMounted) {
                        for (let index = 0; index < res.data[0].coordinates.length; index++) {

                            arrayCoordinates.push([res.data[0].coordinates[index].latitude,
                            res.data[0].coordinates[index].longitude])

                        }
                        setCoordinates([arrayCoordinates])
                    }
                }).catch(function (e) {
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })

            await api.get(`/checkin/all`, {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then(res => {
                    if (isMounted) {
                        for (let index = 0; index < res.data.length; index++) {
                            if (communes === res.data[index].comuna) {
                                qtyC += 1
                                arrayCoordinatesCheckin.push(res.data[index].coordinates[0])
                            }
                        }
                        setCoordinatesCheckin({ coorCheckin: arrayCoordinatesCheckin })

                        const rows = [
                            createData('Comuna', communes),
                            createData('Cantidad de check in (Amarillo)', qtyC),
                            createData('Cantidad de alertas (Rojo)' , qtyA),
                        ]
                        setRows(rows)
                    }
                }).catch(function (e) {
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })
                
            await api.get(`/helpSOS/all`, {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then(res => {
                    if (isMounted) {
                        for (let i = 0; i < res.data.length; i++) {
                            for (let j = 0; j < res.data[i].puntos.length; j++) {
                                if (communes === res.data[i].puntos[j].comuna) {
                                    qtyA += 1
                                    arrayCoordinatesAlert.push(res.data[i].puntos[j].coordinates[0])
                                }
                            }
                        }
                       
                        setCoordinatesAlert({ coorAlert: arrayCoordinatesAlert })


                        const rows = [
                            createData('Comuna', communes),
                            createData('Cantidad de check in (Amarillo)', qtyC),
                            createData('Cantidad de alertas (Rojo)', qtyA),
                        ]
                        setRows(rows)
                    }
                }).catch(function (e) {
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })
            setIsLoading(false)

        }
        query()

        setState2({ currentLocation })

        return function () {
            ac.abort()
            isMounted = false
        }

    }, [communes, navigate])
    
    return (
        <>
   
            {isLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
                </div>
            }
            {!isLoading &&
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} sm={7}>
                            <div style={{ height: '90vh' }}>
                                <Map center={state2.currentLocation} zoom={11} style={{ width: '100%', height: '100%' }} zoomControl={false}>
                                    <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                    {coordinatesAlert.coorAlert.map((alert, index) => (
                                        <Marker

                                            icon={IconAlert}
                                            title={"Latitud: "+alert.latitude+" Longitud"+alert.longitude}
                                            key={index}
                                            position={JSON.parse('[' + alert.latitude + ', ' + alert.longitude + ']')}>
                                        </Marker>

                                    ))
                                    }
                                    {coordinatesCheckin.coorCheckin.map((checkin, index) => (
                                        <Marker
                                            icon={IconCheckin}
                                            key={index}
                                            position={JSON.parse('[' + checkin.latitude + ', ' + checkin.longitude + ']')}>
                                        </Marker>
                                    ))
                                    }
                                    <Polygon positions={coordinates} color='blue' />
                                    <LocateControl startDirectly />
                                    <ZoomControl position='bottomleft' />

                                </Map>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={5} id='tableform'>
                            <Grid item className={classes.gridform}  >
                                <Paper className={classes.paperform} elevation={15}>

                                    <TableContainer>
                                        <Table className={classes.table} style={{ backgroundColor: '#fafafa' }} aria-label='simple table'>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align='center'><b>Título</b></TableCell>
                                                    <TableCell align='center'><b>Información</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow className={classes.row} key={row.name}>
                                                        <TableCell component='th' scope='row'>
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align='center'><b style={{ color: 'red' }}>{row.info}</b></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>

                        </Grid>
                    </Grid>
                </div>
            }
        </>
    )
}

export default connect(mapStateToProps, { sendCommunes })(MapViewData)
