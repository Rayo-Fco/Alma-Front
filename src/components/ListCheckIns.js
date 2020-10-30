import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { Accordion, Card } from 'react-bootstrap';
import { Map, TileLayer } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { IconPin } from './IconLocation'
import useFindCheckin from '../hooks/useFindCheckin';

const useStyles = makeStyles((theme) => ({
    typ: {
        margin: 'auto',
        fontSize: 55
    },
    input: {
        width: '50%'
    },
    button: {
        width: '20%',
        height: 55,
        marginLeft: '2%',
        fontSize: '70%'
    },
    typho: {
        fontSize: 20,
    },
    b: {
        fontSize: 20,
        color: 'black'
    },
    container: {
        paddingBottom: theme.spacing(3),
    },
    cnt: {
        minHeight: 650
    },
    acordionCollapse: {
        height: 'auto'
    },
    grd: {
        width: '100%',
        height: 150,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
}))

function ListCheckIns(props) {
    const classes = useStyles();
    const [checkins2, setCheckins2] = useState({ User: [] })
    const [checkins, setCheckins] = useState({ User: [] })

    const [rut, setRut] = useState("")
    const { findcheckin, checkin } = useFindCheckin()

    useEffect(() => {
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        console.log(checkin)
        axios.get('http://localhost:3001/checkin/all2', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                if (isMounted) {
                    console.log(res.data)
                    setCheckins({ User: res.data })
                }
            }).catch(function (e) {
                if (isMounted) {
                    if (axios.isCancel(e)) {
                    }
                }
            })
        return function () {
            isMounted = false;
        }
    }, [checkin,setCheckins])


    function currentLocation(latitude, longitude) {
        let currentLocation = {
            lat: latitude,
            lng: longitude
        }
        return currentLocation
    }


    useEffect(() => {
        if (checkin) {
            setCheckins2({ User: checkin })
        }
    }, [checkin])

    const handleSubmit = e => {
        findcheckin({ rut })
        
     
        console.log(checkin)

        console.log("algo")

    };


    return (
        <Container fixed className={classes.cnt}>
            <Paper className={classes.cnt} elevation={3} style={{ cursor: 'pointer' }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.typ} color="primary">
                            Check ins
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            id=""
                            label="Rut"
                            variant="outlined"
                            onChange={(e) => setRut(e.target.value)}
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}
                            onClick={() => handleSubmit()}>
                            Buscar
                        </Button>
                    </Grid>
                    <Container fixed className={classes.container}>
                        <Accordion>
                            {
                                checkin
                                ?
                                <>
                                {
                                    checkins2.User.map((check, index) => (
                                        <Paper key={index} elevation={0} style={{backgroundColor: '#fafafa'}}>
                                            <Accordion.Toggle as={Card.Header} eventKey={index + 1} style={{ display: 'flex' }}>
                                                <Grid item xs={6} >
                                                <Typography className={classes.typho} color="primary">
                                                <b className={classes.b}>Usuario: </b>{check.user[0].email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Typography color="primary" className={classes.typho}>
                                                        <b className={classes.b}>Rut: </b>{check.user[0].rut}
                                                    </Typography>
                                                </Grid>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse className={classes.acordionCollapse} eventKey={index + 1}>
                                                <Card>
                                                    <Grid container spacing={1}>
                                                        <Grid xs={6}>
    
                                                            <Grid item xs zeroMinWidth>
                                                                <Typography noWrap><b className={classes.b}>Comuna: </b>{check.comuna}</Typography>
    
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                {
                                                                    check.info[0].numero_depto
                                                                        ?
                                                                        <Typography noWrap><b className={classes.b}>Numero departamento: </b>{check.info[0].numero_depto}</Typography>
    
                                                                        :
                                                                        <></>
                                                                }
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                {
                                                                    check.info[0].numero_piso
                                                                        ?
                                                                        <Typography noWrap><b className={classes.b}>Numero de Piso: </b>{check.info[0].numero_piso}</Typography>
                                                                        :
                                                                        <></>
                                                                }
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                {
                                                                    check.info[0].extra
                                                                        ?
                                                                        <Typography noWrap><b className={classes.b}>Extra: </b>{check.info[0].extra}</Typography>
                                                                        :
                                                                        <></>
                                                                }
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                <Typography noWrap><b className={classes.b}>Fecha: </b>{check.date.split("T")[0]}</Typography>
                                                            </Grid>
                                                            <Grid item xs zeroMinWidth>
                                                                <Typography noWrap><b className={classes.b}>Hora: </b>{check.date.split("T")[1].split("7Z")[0].split(".")[0]}</Typography>
                                                            </Grid>
                                                        </Grid>
                                                        <Grid xs={6} >
                                                            <Grid item xs zeroMinWidth>
                                                                <Map center={currentLocation(check.coordinates[0].latitude, check.coordinates[0].longitude)} zoom={15} className={classes.grd}>
                                                                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                                                    <Marker
                                                                        position={currentLocation(check.coordinates[0].latitude, check.coordinates[0].longitude)}
                                                                        icon={IconPin} >
                                                                        <Popup>
                                                                          
                                                                        </Popup>
                                                                    </Marker>
                                                                </Map>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Card>
                                            </Accordion.Collapse>
                                        </Paper>
                                    ))
                                }
                                </>
                                :
                                checkins.User.map((checkin, index) => (
                                    <Paper key={index} elevation={0} style={{backgroundColor: '#fafafa'}}>
                                        <Accordion.Toggle as={Card.Header} eventKey={index + 1} style={{ display: 'flex' }}>
                                            <Grid item xs={6} >
                                            <Typography className={classes.typho} color="primary">
                                            <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography color="primary" className={classes.typho}>
                                                    <b className={classes.b}>Rut: </b>{checkin.user[0].rut}
                                                </Typography>
                                            </Grid>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse className={classes.acordionCollapse} eventKey={index + 1}>
                                            <Card>
                                                <Grid container spacing={1}>
                                                    <Grid xs={6}>

                                                        <Grid item xs zeroMinWidth>
                                                            <Typography noWrap><b className={classes.b}>Comuna: </b>{checkin.comuna}</Typography>

                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            {
                                                                checkin.info[0].numero_depto
                                                                    ?
                                                                    <Typography noWrap><b className={classes.b}>Numero departamento: </b>{checkin.info[0].numero_depto}</Typography>

                                                                    :
                                                                    <></>
                                                            }
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            {
                                                                checkin.info[0].numero_piso
                                                                    ?
                                                                    <Typography noWrap><b className={classes.b}>Numero de Piso: </b>{checkin.info[0].numero_piso}</Typography>
                                                                    :
                                                                    <></>
                                                            }
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            {
                                                                checkin.info[0].extra
                                                                    ?
                                                                    <Typography noWrap><b className={classes.b}>Extra: </b>{checkin.info[0].extra}</Typography>
                                                                    :
                                                                    <></>
                                                            }
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography noWrap><b className={classes.b}>Fecha: </b>{checkin.date.split("T")[0]}</Typography>
                                                        </Grid>
                                                        <Grid item xs zeroMinWidth>
                                                            <Typography noWrap><b className={classes.b}>Hora: </b>{checkin.date.split("T")[1].split("7Z")[0].split(".")[0]}</Typography>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid xs={6} >
                                                        <Grid item xs zeroMinWidth>
                                                            <Map center={currentLocation(checkin.coordinates[0].latitude, checkin.coordinates[0].longitude)} zoom={15} className={classes.grd}>
                                                                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                                                                <Marker
                                                                    position={currentLocation(checkin.coordinates[0].latitude, checkin.coordinates[0].longitude)}
                                                                    icon={IconPin} >
                                                                    <Popup>
                                                                        {checkin.comuna}
                                                                    </Popup>
                                                                </Marker>
                                                            </Map>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Accordion.Collapse>
                                    </Paper>
                                ))
                            }
                        </Accordion>
                    </Container>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ListCheckIns;