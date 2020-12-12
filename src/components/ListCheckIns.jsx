import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Container, Paper, Typography, TextField, Button } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import { Map, TileLayer } from 'react-leaflet'
import { Marker, Popup } from 'react-leaflet'
import { IconPin } from './IconLocation'
import useFindCheckin from '../hooks/useFindCheckin'
import { useLocation } from 'wouter'
import { useRut } from 'react-rut'
import Modal from '@material-ui/core/Modal'
import CircularProgress from '@material-ui/core/CircularProgress'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import api from '../services/api'
import Alert from '@material-ui/lab/Alert';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles((theme) => ({
    typ: {
        margin: 'auto',
        paddingTop: 25,
        fontSize: 30
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
        fontSize: 14,
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
        marginLeft: 10,
        marginBottom:5,
        marginTop:5
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
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paperMap: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    paperPhoto: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    heading: {
        fontSize: theme.typography.pxToRem(14),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(14),
        color: theme.palette.text.secondary,
    },
    accordion: {
        backgroundColor: '#f2f2f2'
    }
}))

function ListCheckIns(props) {
    const classes = useStyles()
    const [checkins, setCheckins] = useState({ User: [] })
    const [, navigate] = useLocation()
    const { findcheckin, checkin, isFindLoading, hasFindError } = useFindCheckin()
    const [{ formattedValue }, setRut] = useRut()
    const [openMap, setOpenMap] = useState(false)
    const [openPhoto, setOpenPhoto] = useState(false)
    const [resOpen, setResOpen] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [openAlertError, setOpenAlertError] = useState(true)
    const [openAlertSucceed, setOpenAlertSucceed] = useState(true)

    const handleOpenMap = (checkin) => {
        setResOpen(checkin)
        setOpenMap(true)
    };

    const handleCloseMap = () => {
        setOpenMap(false)
    };


    const handleOpenPhoto = (checkin) => {
        setResOpen(checkin)
        setOpenPhoto(true)
    };


    const handleClosePhoto = () => {
        setOpenPhoto(false)
    };

    useEffect(() => {
        window.scrollTo(0, 0)
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        api.get(`/checkin/all`, {
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

    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    const handleSubmit = e => {
        const rut = formattedValue
        setOpenAlertError(true)
        setOpenAlertSucceed(true)
        findcheckin({ rut })
    };

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
                                    <Grid item xs={12} className={classes.gridForm}>
                                        {
                                            hasFindError &&
                                            <Collapse in={openAlertError}>

                                                <Alert
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpenAlertError(false);
                                                            }}>
                                                            <CloseIcon fontSize="inherit" />
                                                        </IconButton>
                                                    }
                                                    className={classes.alert}
                                                    variant="filled"
                                                    severity="error">
                                                    No se ha encontrado o esta mal ingresado el RUT
                                                </Alert>
                                            </Collapse>

                                        }
                                        {checkin &&
                                            <Collapse in={openAlertSucceed}>
                                                <Alert
                                                    action={
                                                        <IconButton
                                                            aria-label="close"
                                                            color="inherit"
                                                            size="small"
                                                            onClick={() => {
                                                                setOpenAlertSucceed(false);
                                                            }}>
                                                            <CloseIcon fontSize="inherit" />
                                                        </IconButton>
                                                    }
                                                    className={classes.alert}
                                                    variant="filled"
                                                    severity="success">
                                                    Se ha encontrado correctamente
                                                </Alert>
                                            </Collapse>
                                        }
                                    </Grid>

                                    <Container className={classes.container} style={{ cursor: 'pointer' }}>
                                        {
                                            checkin
                                                ?
                                                <>
                                                    {
                                                        checkin.slice(0).reverse().map((checkin, index) => (
                                                            <div key={index} >
                                                                <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                                                    <AccordionSummary
                                                                        expandIcon={<ExpandMoreIcon />}
                                                                        id="panel1bh-header"
                                                                        className={classes.accordion}
                                                                    >
                                                                        <Typography className={classes.heading}>
                                                                            <b className={classes.b}>Rut </b>{checkin.user[0].rut}
                                                                        </Typography>
                                                                        <Typography className={classes.secondaryHeading}>
                                                                            <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                                        </Typography>
                                                                    </AccordionSummary>
                                                                    <AccordionDetails className={classes.accordionDetails}>
                                                                        <Grid container className={classes.contUsers} key={index}>
                                                                            <Grid container className={classes.contUsersMap} key={index}>
                                                                                <Grid item xs={6}>

                                                                                    <Grid item xs zeroMinWidth>
                                                                                        {checkin.comuna
                                                                                            ?
                                                                                            <Typography noWrap>
                                                                                                <b className={classes.b}>Comuna </b><br />
                                                                                                {checkin.comuna}
                                                                                            </Typography>
                                                                                            :
                                                                                            <Typography noWrap>
                                                                                                <b className={classes.b}>Comuna </b><br />
                                                                                                    N/A
                                                                                                </Typography>

                                                                                        }

                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        {
                                                                                            checkin.info[0].numero_depto
                                                                                                ?
                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Numero departamento </b><br />
                                                                                                    {checkin.info[0].numero_depto}
                                                                                                </Typography>

                                                                                                :
                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Numero departamento </b><br />
                                                                                                       N/A
                                                                                                </Typography>
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
                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Numero de Piso </b> <br />
                                                                                                N/A
                                                                                            </Typography>
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

                                                                                                <Typography noWrap>
                                                                                                    <b className={classes.b}>Extra </b><br />
                                                                                                   N/A
                                                                                               </Typography>
                                                                                        }
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Fecha </b><br />
                                                                                            {new Date(checkin.date).toLocaleDateString()}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Hora </b> <br />
                                                                                            {new Date(checkin.date).toLocaleTimeString()}
                                                                                        </Typography>
                                                                                    </Grid>
                                                                                </Grid>
                                                                                <Grid item xs={6} className={classes.gridButton} >
                                                                                    <Grid item xs zeroMinWidth>
                                                                                        <div>
                                                                                            <Button className={classes.modalButton} id="buttonOpenMap" onClick={() => { handleOpenMap(checkin) }} variant="outlined">
                                                                                                Abrir mapa
                                                                                    </Button>
                                                                                            {checkin.fotos[0] &&
                                                                                                <Button className={classes.modalButton} id="buttonOpenPhotos" onClick={() => { handleOpenPhoto(checkin) }} variant="outlined">
                                                                                                    Ver foto
                                                                                        </Button>
                                                                                            }

                                                                                        </div>
                                                                                    </Grid>
                                                                                </Grid>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </AccordionDetails>
                                                                </Accordion>
                                                            </div>
                                                        ))
                                                    }
                                                </>
                                                :
                                                checkins.User.slice(0).reverse().map((checkin, index) => (
                                                    <div key={index} >

                                                        <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                                            <AccordionSummary
                                                                expandIcon={<ExpandMoreIcon />}
                                                                id="panel1bh-header"
                                                                className={classes.accordion}>
                                                                <Typography className={classes.heading}>
                                                                    <b className={classes.b}>Rut </b>{checkin.user[0].rut}
                                                                </Typography>
                                                                <Typography className={classes.secondaryHeading}>
                                                                    <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                                </Typography>
                                                            </AccordionSummary>
                                                            <AccordionDetails className={classes.accordionDetails}>
                                                                <Grid container className={classes.contUsers} key={index}>
                                                                    <Grid container className={classes.contUsersMap} key={index}>
                                                                        <Grid item xs={6}>

                                                                            <Grid item xs zeroMinWidth>
                                                                                {checkin.comuna
                                                                                    ?
                                                                                    <Typography noWrap>
                                                                                        <b className={classes.b}>Comuna </b><br />
                                                                                        {checkin.comuna}
                                                                                    </Typography>
                                                                                    :
                                                                                    <Typography noWrap>
                                                                                        <b className={classes.b}>Comuna </b><br />
                                                                                                N/A
                                                                                        </Typography>
                                                                                }

                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                {
                                                                                    checkin.info[0].numero_depto
                                                                                        ?
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Numero departamento </b><br />
                                                                                            {checkin.info[0].numero_depto}
                                                                                        </Typography>

                                                                                        :
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Numero departamento </b><br />
                                                                                        N/A
                                                                                    </Typography>
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
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Numero de Piso </b> <br />
                                                                                            N/A
                                                                                    </Typography>
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
                                                                                        <Typography noWrap>
                                                                                            <b className={classes.b}>Extra </b><br />
                                                                                        N/A
                                                                                    </Typography>
                                                                                }
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                <Typography noWrap>
                                                                                    <b className={classes.b}>Fecha </b><br />
                                                                                    {new Date(checkin.date).toLocaleDateString()}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs zeroMinWidth>
                                                                                <Typography noWrap>
                                                                                    <b className={classes.b}>Hora </b> <br />
                                                                                    {new Date(checkin.date).toLocaleTimeString()}
                                                                                </Typography>
                                                                            </Grid>
                                                                        </Grid>
                                                                        <Grid item xs={6} className={classes.gridButton} >
                                                                            <Grid item xs zeroMinWidth>
                                                                                <div>
                                                                                    <Button className={classes.modalButton} id="buttonOpenMap" onClick={() => { handleOpenMap(checkin) }} variant="outlined">
                                                                                        Abrir mapa
                                                                            </Button>
                                                                                    {checkin.fotos[0] &&
                                                                                        <Button className={classes.modalButton} id="buttonOpenPhotos" onClick={() => { handleOpenPhoto(checkin) }} variant="outlined">
                                                                                            Ver foto
                                                                                </Button>
                                                                                    }

                                                                                </div>
                                                                            </Grid>
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </AccordionDetails>
                                                        </Accordion>
                                                    </div>

                                                ))
                                        }
                                    </Container>
                                </Grid>
                            </Paper>
                        </Container>
                    }
                </>
            }
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openMap}
                onClose={handleCloseMap}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={openMap}>
                    <div className={classes.modalMap}>
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
                </Fade>
            </Modal>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openPhoto}
                onClose={handleClosePhoto}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}>
                <Fade in={openPhoto}>
                    <div className={classes.paperPhoto}>

                        {resOpen &&
                            <img className={classes.media}
                                src={resOpen.fotos[0]}
                                alt="Paella dish" />
                        }
                    </div>
                </Fade>
            </Modal>
        </>

    );
}

export default ListCheckIns;