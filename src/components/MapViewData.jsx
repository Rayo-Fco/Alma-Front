import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { Marker, Popup } from 'react-leaflet'
import { sendCommunes } from '../actions/communesAction'
import { connect } from "react-redux"
import { selectActiveCommunes } from '../reducers/communesReducer'
import { IconPin } from './IconLocation'
import { useLocation } from 'wouter'
import LocateControl from './LocateControl'
import axios from 'axios'
import { CircularProgress, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, makeStyles, Paper, Table } from '@material-ui/core';

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
}));
function createData(name, info) {
    return { name, info };
}
function MapViewData({ communes }) {
    const classes = useStyles();
    const [count, setCount] = useState({ c: 0 })
    const [communeName, SetCommuneName] = useState('')
    const [, navigate] = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const [rows, setRows] = useState([])
    const [state2, setState2] = useState({
        currentLocation: { lat: 0, lng: 0 },
    })

    useEffect(() => {
        window.scrollTo(0, 0)
        let isMounted = true
        let qtyC = 0
        let qtyA = 0

        let currentLocation = {
            lat: 0,
            lng: 0
        }
        if (communes === "PADRE HURTADO") {

            currentLocation = {
                lat: -33.5669406,
                lng: -70.8008581
            }
        }
        else if (communes === "PEDRO AGUIRRE CERDA") {
            currentLocation = {
                lat: -33.4939433,
                lng: -70.6764605
            }

        }
        else if (communes === "PUENTE ALTO") {
            currentLocation = {
                lat: -33.6091053,
                lng: -70.5740701
            }
        } else if (communes === "SAN BERNARDO") {
            currentLocation = {
                lat: -33.5923161,
                lng: -70.7045801
            }

        } else if (communes === "CERRILLOS") {
            currentLocation = {
                lat: -33.4873784,
                lng: -70.7038997
            }
        } else if (communes === "CERRO NAVIA") {
            currentLocation = {
                lat: -33.4290011,
                lng: -70.7307595
            }
        } else if (communes === "CONCHALÍ") {
            currentLocation = {
                lat: -33.3965342,
                lng: -70.6708915
            }
        } else if (communes === "EL BOSQUE") {
            currentLocation = {
                lat: -33.5556072,
                lng: -70.6661592
            }
        } else if (communes === "ESTACIÓN CENTRAL") {
            currentLocation = {
                lat: -33.4534456,
                lng: -70.6905739
            }
        } else if (communes === "HUECHURABA") {
            currentLocation = {
                lat: -33.3748475,
                lng: -70.6370713
            }
        } else if (communes === "INDEPENDENCIA") {
            currentLocation = {
                lat: -33.4222791,
                lng: -70.6554112
            }
        } else if (communes === "LA CISTERNA") {
            currentLocation = {
                lat: -33.5347067,
                lng: -70.6637976
            }
        } else if (communes === "LA FLORIDA") {
            currentLocation = {
                lat: -33.5204165,
                lng: -70.599348
            }
        } else if (communes === "LA GRANJA") {
            currentLocation = {
                lat: -33.5433894,
                lng: -70.6324196
            }
        } else if (communes === "LA PINTANA") {
            currentLocation = {
                lat: -33.5830182,
                lng: -70.6292425
            }
        } else if (communes === "LA REINA") {
            currentLocation = {
                lat: -33.442607,
                lng: -70.5434343
            }
        } else if (communes === "LAS CONDES") {
            currentLocation = {
                lat: -33.4081069,
                lng: -70.5673758
            }
        } else if (communes === "LO BARNECHEA") {
            currentLocation = {
                lat: -33.3610533,
                lng: -70.5054732
            }
        } else if (communes === "LO ESPEJO") {
            currentLocation = {
                lat: -33.5243181,
                lng: -70.6958048
            }
        } else if (communes === "LO PRADO") {
            currentLocation = {
                lat: -33.4416447,
                lng: -70.717381
            }
        } else if (communes === "MACUL") {
            currentLocation = {
                lat: -33.4814929,
                lng: -70.5992918
            }
        } else if (communes === "MAIPÚ") {
            currentLocation = {
                lat: -33.5097323,
                lng: -70.7563382
            }
        } else if (communes === "ÑUÑOA") {
            currentLocation = {
                lat: -33.4538707,
                lng: -70.5937553
            }
        } else if (communes === "PEÑALOLÉN") {
            currentLocation = {
                lat: -33.4794626,
                lng: -70.5363195
            }
        } else if (communes === "PROVIDENCIA") {
            currentLocation = {
                lat: -33.4313271,
                lng: -70.6089495
            }
        } else if (communes === "PUDAHUEL") {
            currentLocation = {
                lat: -33.4365561,
                lng: -70.7513677
            }
        } else if (communes === "QUILICURA") {
            currentLocation = {
                lat: -33.3686752,
                lng: -70.7313338
            }
        } else if (communes === "QUINTA NORMAL") {
            currentLocation = {
                lat: -33.4223485,
                lng: -70.6960244
            }
        } else if (communes === "RECOLETA") {
            currentLocation = {
                lat: -33.4873784,
                lng: -70.7038997
            }
        } else if (communes === "RENCA") {
            currentLocation = {
                lat: -33.4036071,
                lng: -70.7047995
            }
        } else if (communes === "SAN JOAQUÍN") {
            currentLocation = {
                lat: -33.4960453,
                lng: -70.6284055
            }
        } else if (communes === "SAN MIGUEL") {
            currentLocation = {
                lat: -33.4877662,
                lng: -70.6504591
            }
        } else if (communes === "SAN RAMÓN") {
            currentLocation = {
                lat: -33.5426888,
                lng: -70.64288
            }
        } else if (communes === "SANTIAGO") {
            currentLocation = {
                lat: -33.4370208,
                lng: -70.6486695
            }
        } else if (communes === "VITACURA") {
            currentLocation = {
                lat: -33.3869341,
                lng: -70.5767754
            }
        } else if (communes === "") {
            navigate('/')
        }
        const token = window.sessionStorage.getItem('tokenadmin')
        axios.get('http://localhost:3001/checkin/all', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                if (isMounted) {
                    for (let index = 0; index < res.data.length; index++) {
                        if (communes === res.data[index].comuna) {
                            qtyC += 1
                        }
                    }
                }
            }).catch(function (e) {
                if (isMounted) {
                    if (axios.isCancel(e)) {
                    }
                }
            })
        axios.get('http://localhost:3001/helpSOS/all', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                if (isMounted) {
                    for (let i = 0; i < res.data.length; i++) {
                        for (let j = 0; j < res.data[i].puntos.length; j++) {
                            if (communes === res.data[i].puntos[0].comuna) {
                                qtyA += 1
                            }
                        }
                    }
                    const rows = [
                        createData('Comuna', communes),
                        createData('Cantidad de check in', qtyC),
                        createData('Cantidad de alertas', qtyA),
                    ];
                    setRows(rows)
                    setIsLoading(false)
                }
            }).catch(function (e) {
                if (isMounted) {
                    if (axios.isCancel(e)) {
                    }
                }
            })



        SetCommuneName(communes)
        const c = 2

        if (count.c <= 1) {
            setState2({ currentLocation })
            setCount({ c })
        }
        return function () {
            isMounted = false;
        }

    }, [count, state2, communes, navigate]);

    return (
        <>
            {isLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
                </div>
            }W
            {!isLoading &&
                <div className={classes.root}>
                    <Grid container>
                        <Grid item xs={12} sm={7}>
                            <div style={{ height: '100vh' }}>

                                <Map center={state2.currentLocation} zoom={23} style={{ width: '100%', height: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                    <Marker
                                        position={state2.currentLocation}
                                        icon={IconPin} >
                                        <Popup>
                                            {communeName}
                                        </Popup>
                                    </Marker>
                                    <LocateControl startDirectly />
                                </Map>
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={5} id="tableform">
                            <Grid item className={classes.gridform}  >
                                <Paper className={classes.paperform} elevation={15}>

                                    <TableContainer>
                                        <Table className={classes.table} style={{ backgroundColor: '#fafafa' }} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>Titulo</b></TableCell>
                                                    <TableCell align="center"><b>Informacion</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow className={classes.row} key={row.name}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="center"><b style={{ color: 'red' }}>{row.info}</b></TableCell>
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
