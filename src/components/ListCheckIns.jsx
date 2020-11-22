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
import { useLocation } from 'wouter';
import { useRut } from 'react-rut';
import Modal from '@material-ui/core/Modal';
import CircularProgress from '@material-ui/core/CircularProgress';

function rand() {
    return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
        top: `${top}%`,
        left: `${left}%`,
        transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyles = makeStyles((theme) => ({
    typ: {
        margin: 'auto',
        paddingTop: 25,
        fontSize: 40
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
        paddingRight: 0,
        paddingLeft: 0
    },
    cnt: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(1),
        minHeight: 650,
        minWidth: 425
    },
    acordionCollapse: {
        height: 'auto'
    },
    grd: {
        width: 'auto',
        height: '100%',
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    gridForm: {
        marginBottom: 30
    },
    gridButton: {
        display: 'flex',
        alignItems: 'center',
    },
    modalMap: {
        position: 'absolute',
        width: '60%',
        height: '60%',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),

    },
    modalPhoto: {
        position: 'absolute',
        width: 'auto',
        height: 'auto',
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        top: '7vh',
        left: '18vw',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
    },
    media: {
        maxWidth: '100%',
        width: '350px',
    },
    modalButton: {
        marginLeft: 10
    },
    progress: {
        height: '80%',
        width: '80%',
        paddingTop: '30%',
        paddingLeft: '15%'

    },
    circular: {
        color: '#fd9eef'
    },
}))

function ListCheckIns(props) {
    const classes = useStyles();
    const [checkins2, setCheckins2] = useState({ User: [] })
    const [checkins, setCheckins] = useState({ User: [] })
    const [, navigate] = useLocation()
    const { findcheckin, checkin, isFindLoading } = useFindCheckin()
    const [{ formattedValue }, setRut] = useRut();
    const [modalStyle] = useState(getModalStyle);
    const [openMap, setOpenMap] = useState(false);
    const [openPhoto, setOpenPhoto] = useState(false);
    const [resOpen, setResOpen] = useState()
    const [isLoading, setIsLoading] = useState(true)

    const handleOpenMap = (checkin) => {
        setResOpen(checkin)
        setOpenMap(true);
    };

    const handleCloseMap = () => {
        setOpenMap(false);
    };


    const handleOpenPhoto = (checkin) => {
        setResOpen(checkin)
        setOpenPhoto(true);
    };


    const handleClosePhoto = () => {
        setOpenPhoto(false);
    };

    useEffect(() => {
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        axios.get('http://localhost:3001/checkin/all', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                if (isMounted) {
                    setCheckins({ User: res.data })
                    setIsLoading(false)
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
    }, [checkin, setCheckins])

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        }
        return () => ac.abort();
    }, [navigate])

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
        const rut = formattedValue
        findcheckin({ rut })
        console.log(checkin)
        console.log("algo")

    };

    const map = (
        <div style={modalStyle} className={classes.modalMap}>
            {resOpen &&
                <Map center={currentLocation(resOpen.coordinates[0].latitude, resOpen.coordinates[0].longitude)} zoom={25} className={classes.grd}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
                    <Marker
                        position={currentLocation(resOpen.coordinates[0].latitude, resOpen.coordinates[0].longitude)}
                        icon={IconPin} >
                        <Popup>
                            {resOpen.comuna}
                        </Popup>
                    </Marker>
                </Map>
            }

        </div>
    );

    const photo = (
        <div style={modalStyle} className={classes.modalPhoto}>


            {resOpen &&

                <img className={classes.media}
                    src={resOpen.fotos[0]}
                    alt="Paella dish" />
            }

        </div>
    );


    return (
        <>
            {isLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
                </div>
            }

            {!isLoading &&
                <>
                    {isFindLoading &&
                        <div className={classes.progress}>
                            <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
                        </div>
                    }
                    {!isFindLoading &&
                        <Container fixed className={classes.cnt}>
                            <Paper className={classes.cnt} elevation={3}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <Typography className={classes.typ} color="primary">
                                            Check ins
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={12} className={classes.gridForm}>
                                        <TextField
                                            className={classes.input}
                                            id=""
                                            label="Rut"
                                            variant="outlined"
                                            value={formattedValue}
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
                                    <Container className={classes.container} style={{ cursor: 'pointer' }}>
                                        <Accordion>
                                            {
                                                checkin
                                                    ?
                                                    <>
                                                        {
                                                            checkins2.User.map((checkin, index) => (
                                                                <Paper key={index} elevation={0} style={{ backgroundColor: '#fafafa' }}>
                                                                    <Accordion.Toggle as={Card.Header} eventKey={index + 1} style={{ display: 'flex' }}>
                                                                        <Grid item xs={6} >
                                                                            <Typography className={classes.typho} color="primary">
                                                                                <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                                            </Typography>
                                                                        </Grid>
                                                                        <Grid item xs={6}>
                                                                            <Typography color="primary" className={classes.typho}>
                                                                                <b className={classes.b}>Rut </b>{checkin.user[0].rut}
                                                                            </Typography>
                                                                        </Grid>
                                                                    </Accordion.Toggle>
                                                                    <Accordion.Collapse className={classes.acordionCollapse} eventKey={index + 1}>
                                                                        <Card>
                                                                            <Grid container>
                                                                                <Grid item xs={6}>

                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Comuna </b><br />
                                                                                            {checkin.comuna}
                                                                                        </Typography>

                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        {
                                                                                            checkin.info[0].numero_depto
                                                                                                ?
                                                                                                <Typography noWrap
                                                                                                ><b className={classes.b}>Numero departamento </b><br />
                                                                                                    {checkin.info[0].numero_depto}
                                                                                                </Typography>

                                                                                                :
                                                                                                <></>
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        {
                                                                                            checkin.info[0].numero_piso
                                                                                                ?
                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Numero de Piso </b> <br />
                                                                                                    {checkin.info[0].numero_piso}
                                                                                                </Typography>
                                                                                                :
                                                                                                <></>
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        {
                                                                                            checkin.info[0].extra
                                                                                                ?
                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Extra </b><br />
                                                                                                    {checkin.info[0].extra}
                                                                                                </Typography>
                                                                                                :
                                                                                                <></>
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Fecha </b><br />
                                                                                            {checkin.date.split("T")[0]}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Hora </b> <br />
                                                                                            {checkin.date.split("T")[1].split("7Z")[0].split(".")[0]}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={6} className={classes.gridButton} >
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <div>
                                                                                            <Button className={classes.modalButton} onClick={() => { handleOpenMap(checkin) }} variant="outlined">
                                                                                                Abrir mapa
                                                                                            </Button>
                                                                                            {checkin.fotos[0] &&
                                                                                                <Button className={classes.modalButton} onClick={() => { handleOpenPhoto(checkin) }} variant="outlined">
                                                                                                    Ver foto
                                                                                                </Button>
                                                                                            }
                                                                                            <Modal
                                                                                                open={openMap}
                                                                                                onClose={handleCloseMap}
                                                                                                aria-labelledby="simple-modal-title"
                                                                                                aria-describedby="simple-modal-description">
                                                                                                {map}
                                                                                            </Modal>
                                                                                            <Modal
                                                                                                open={openPhoto}
                                                                                                onClose={handleClosePhoto}
                                                                                                aria-labelledby="simple-modal-title"
                                                                                                aria-describedby="simple-modal-description">
                                                                                                {photo}
                                                                                            </Modal>
                                                                                        </div>
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
                                                        <Paper key={index} elevation={0} style={{ backgroundColor: '#fafafa' }}>
                                                            <Accordion.Toggle as={Card.Header} eventKey={index + 1} style={{ display: 'flex' }}>
                                                                <Grid item xs={6} >
                                                                    <Typography className={classes.typho} color="primary">
                                                                        <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                                    </Typography>
                                                                </Grid>
                                                                <Grid item xs={6}>
                                                                    <Typography color="primary" className={classes.typho}>
                                                                        <b className={classes.b}>Rut </b>{checkin.user[0].rut}
                                                                    </Typography>
                                                                </Grid>
                                                            </Accordion.Toggle>
                                                            <Accordion.Collapse className={classes.acordionCollapse} eventKey={index + 1}>
                                                                <Card>
                                                                    <Grid container>
                                                                        <Grid item xs={6}>

                                                                            <Grid item xs zeroMinWidth>
                                                                                <Typography noWrap>
                                                                                    <b className={classes.b}>Comuna </b><br />
                                                                                    {checkin.comuna}
                                                                                </Typography>

                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                {
                                                                                    checkin.info[0].numero_depto
                                                                                        ?
                                                                                        <Typography noWrap
                                                                                        ><b className={classes.b}>Numero departamento </b><br />
                                                                                            {checkin.info[0].numero_depto}
                                                                                        </Typography>

                                                                                        :
                                                                                        <></>
                                                                                }
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                {
                                                                                    checkin.info[0].numero_piso
                                                                                        ?
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Numero de Piso </b> <br />
                                                                                            {checkin.info[0].numero_piso}
                                                                                        </Typography>
                                                                                        :
                                                                                        <></>
                                                                                }
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                {
                                                                                    checkin.info[0].extra
                                                                                        ?
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Extra </b><br />
                                                                                            {checkin.info[0].extra}
                                                                                        </Typography>
                                                                                        :
                                                                                        <></>
                                                                                }
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                <Typography noWrap>
                                                                                    <b className={classes.b}>Fecha </b><br />
                                                                                    {checkin.date.split("T")[0]}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                <Typography noWrap>
                                                                                    <b className={classes.b}>Hora </b> <br />
                                                                                    {checkin.date.split("T")[1].split("7Z")[0].split(".")[0]}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={6} className={classes.gridButton} >
                                                                            <Grid item xs zeroMinWidth>
                                                                                <div>
                                                                                    <Button className={classes.modalButton} onClick={() => { handleOpenMap(checkin) }} variant="outlined">
                                                                                        Abrir mapa
                                                                                    </Button>
                                                                                    {checkin.fotos[0] &&
                                                                                        <Button className={classes.modalButton} onClick={() => { handleOpenPhoto(checkin) }} variant="outlined">
                                                                                            Ver foto
                                                                                        </Button>
                                                                                    }
                                                                                    <Modal
                                                                                        open={openMap}
                                                                                        onClose={handleCloseMap}
                                                                                        aria-labelledby="simple-modal-title"
                                                                                        aria-describedby="simple-modal-description">
                                                                                        {map}
                                                                                    </Modal>
                                                                                    <Modal
                                                                                        open={openPhoto}
                                                                                        onClose={handleClosePhoto}
                                                                                        aria-labelledby="simple-modal-title"
                                                                                        aria-describedby="simple-modal-description">
                                                                                        {photo}
                                                                                    </Modal>
                                                                                </div>
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
                    }
                </>
            }
        </>

    );
}

export default ListCheckIns;