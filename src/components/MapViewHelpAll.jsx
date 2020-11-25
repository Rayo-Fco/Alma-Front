import React, { useState, useEffect } from 'react'
import { Map, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import LocateControl from './LocateControl';
import axios from 'axios'
import { Marker, Popup } from 'react-leaflet'
import { IconPersonHelpAll } from './IconLocation'
import { useLocation } from 'wouter';
import { TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, makeStyles, Paper, Table } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

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

export default function MapViewHelpAll(props) {
    const classes = useStyles();
    const helprut = props.params.helpRut
    const helpalert = props.params.helpalert
    const [, navigate] = useLocation()
    const [rows, setRows] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [alert, setAlert] = useState({ markersPoint: [] })
    const [position] = useState({
        currentLocation: { lat: -33.4372, lng: -70.6506 },
        zoom: 12
    })

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        }
        return () => ac.abort();
    }, [navigate])

    useEffect(() => {
        let isMounted = true
        let interval = ""
        const token = window.sessionStorage.getItem('tokenadmin')

        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        } else {

            let source = axios.CancelToken.source();
            axios.get(`http://localhost:3001/helpSOS/user/${helprut}`, {
                headers: { Authorization: "Bearer " + token },
                cancelToken: source.token,
            })
                .then(res => {

                    if (isMounted) {
                        let deleteDuplicatePoints = []
                        let ind = 0

                        for (let i = res.data[0].puntos[helpalert].coordinates.length; i > 0; i--) {
                            if (i === res.data[0].puntos[helpalert].coordinates.length) {
                                deleteDuplicatePoints.push(res.data[0].puntos[helpalert].coordinates[res.data[0].puntos[helpalert].coordinates.length - 1])

                            } else {
                                for (let j = 0; j < deleteDuplicatePoints.length; j++) {
                                    if (deleteDuplicatePoints[j].latitude !== res.data[0].puntos[helpalert].coordinates[i].latitude && deleteDuplicatePoints[j].longitude !== res.data[0].puntos[helpalert].coordinates[i].longitude) {
                                        deleteDuplicatePoints.push(res.data[0].puntos[helpalert].coordinates[i])

                                    } else {
                                        ind += 1

                                    }

                                }

                            }
                        }
                        const rows = [
                            createData('Rut', res.data[0].user[0].rut),
                            createData('Email', res.data[0].user[0].email),
                            createData('Nombre completo', res.data[0].user[0].nombre + " " + res.data[0].user[0].apellido),
                            createData('Telefono', res.data[0].user[0].telefono),
                            createData('Alertas', res.data[0].puntos.length),
                            createData('Puntos', res.data[0].puntos[helpalert].coordinates.length),
                            createData('Puntos repetidos', ind),
                            createData('Fecha', res.data[0].puntos[helpalert].coordinates[0].date.split("T")[0].split('-').reverse().join('/')),
                            createData('Hora del primer punto', res.data[0].puntos[helpalert].coordinates[0].date.split("T")[1].split("7Z")[0].split(".")[0] ),
                            createData('Hora del ultimo punto', res.data[0].puntos[helpalert].coordinates[res.data[0].puntos[helpalert].coordinates.length - 1].date.split("T")[1].split("7Z")[0].split(".")[0]),
                        ];
                        setRows(rows)
                        setAlert({ markersPoint: deleteDuplicatePoints })
                        console.log("llego xd?");
                        console.log(deleteDuplicatePoints);
                        setIsLoading(false)

                    }
                }).catch(function (e) {

                    if (isMounted) {
                        console.log('pasa');

                        if (axios.isCancel(e)) {

                        }
                    }
                })
        }
        return function () {
            isMounted = false;
            clearInterval(interval);
        }

    }, [helprut, helpalert, navigate, setAlert]);

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
                            <div style={{ height: '100vh' }}>
                                <Map center={position.currentLocation} zoom={position.zoom} style={{ width: '100%', height: '100%' }}>
                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                    {alert.markersPoint.map((point, index) => (
                                        <Marker
                                            icon={IconPersonHelpAll}
                                            key={index}
                                            position={JSON.parse("[" + point.latitude + ", " + point.longitude + "]")}>
                                            <Popup>

                                                Hora: {point.date.split("T")[1].split("7Z")[0].split(".")[0]}<br />
                                              Fecha: {point.date.split("T")[0].split('-').reverse().join('/')}
                                            </Popup>
                                        </Marker>
                                    ))
                                    }
                                    <LocateControl startDirectly />

                                </Map>
                            </div>            </Grid>
                        <Grid item xs={8} sm={5} id="tableform">
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


