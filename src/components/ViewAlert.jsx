import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, Container, Paper, Typography, IconButton, TextField, Button, List, Accordion, AccordionDetails, AccordionSummary } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import axios from 'axios'
import useFindHelpSOS from '../hooks/useFindHelpSOS'
import { useLocation } from 'wouter'
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline'
import { useRut } from 'react-rut'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import api from '../services/api'
import Alert from '@material-ui/lab/Alert'
import CloseIcon from '@material-ui/icons/Close'
import Collapse from '@material-ui/core/Collapse'

const useStyles = makeStyles((theme) => ({
    typ: {
        margin: 'auto',
        paddingTop: 25,
        fontSize: 30,
        paddingBottom: 20
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
        fontSize: 15,
    },
    b: {
        fontSize: 15,
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

    },
    acordionCollapse: {
        height: 'auto'
    },
    grd: {
        width: '160px',
        height: 150,
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    gridForm: {
        marginBottom: 30
    },
    listGrid: {
        textAlign: 'center',
        paddingBottom: 15,
        paddingTop: 15,

    },
    contUsers: {
        paddingBottom: 15,
        paddingTop: 15,
        backgroundColor: '#f0f0f0'

    },
    contUsersMap: {
        borderTop: '2px solid black',
        borderBottom: '2px solid black',
        marginBottom: '-2px'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    accordion: {
        backgroundColor: '#fdcff7',
        textAlign: 'initial'
    },
    accordionDetails: {
        backgroundColor: '#f0f0f0'
    }
}))

function ViewAlert(props) {
    const classes = useStyles()
    const [helpSOS, setHelpSOS] = useState({ User: [] })
    const [, navigate] = useLocation()
    const { findhelpsos, helpsos, hasFindError } = useFindHelpSOS()
    const [{ formattedValue }, setRut] = useRut()
    const [expanded, setExpanded] = React.useState(false)
    const [openAlertError, setOpenAlertError] = useState(true)
    const [openAlertSucceed, setOpenAlertSucceed] = useState(true)

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false)
    }

    useEffect(() => {
        window.scrollTo(0, 0)
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        const query = async () => {

            await api.get(`/helpSOS/all`, {
                headers: { Authorization: 'Bearer ' + token }
            })
                .then(res => {
                    if (isMounted) {
                        setHelpSOS({ User: res.data })
                    }
                }).catch(function (e) {
                    if (isMounted) {
                        if (axios.isCancel(e)) {
                        }
                    }
                })
        }
        query()
        return function () {
            isMounted = false
        }
    }, [setHelpSOS])

    useEffect(() => {
        const ac = new AbortController()
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort()
    }, [navigate])


    const showDatasUser = (user, index) => {
        navigate(`/needhelpall/${user}/${index}`)
    }

    const handleSubmit = e => {
        const rut = formattedValue
        setOpenAlertError(true)
        setOpenAlertSucceed(true)
        findhelpsos({ rut })
    }

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }

    return (
        <Container >
            <Grid container className={classes.cnt}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.cnt}>
                        <Typography className={classes.typ} color='primary'>
                            Ver alertas
                        </Typography>
                        <Grid item xs={12} className={classes.gridForm}>

                            <TextField
                                className={classes.input}
                                onKeyPress={(e) => onKeyUpValue(e)}
                                value={formattedValue}
                                onChange={(e) => setRut(e.target.value)}
                                label='Rut'
                                variant='outlined'
                            />
                            <Button
                                className={classes.button}
                                variant='contained'
                                color='primary'
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
                                                aria-label='close'
                                                color='inherit'
                                                size='small'
                                                onClick={() => {
                                                    setOpenAlertError(false)
                                                }}>
                                                <CloseIcon fontSize='inherit' />
                                            </IconButton>
                                        }
                                        className={classes.alert}
                                        variant='filled'
                                        severity='error'>
                                        No se ha encontrado o esta mal ingresado el RUT
                                    </Alert>
                                </Collapse>

                            }
                            {helpsos &&
                                <Collapse in={openAlertSucceed}>
                                    <Alert
                                        action={
                                            <IconButton
                                                aria-label='close'
                                                color='inherit'
                                                size='small'
                                                onClick={() => {
                                                    setOpenAlertSucceed(false)
                                                }}>
                                                <CloseIcon fontSize='inherit' />
                                            </IconButton>
                                        }
                                        className={classes.alert}
                                        variant='filled'
                                        severity='success'>
                                        Se ha encontrado correctamente
                                                </Alert>
                                </Collapse>
                            }
                        </Grid>
                        <List>
                            {
                                helpsos
                                    ?
                                    <>
                                        {
                                            helpsos.map((help, index) => (
                                                <div key={index} >
                                                    <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                                        <AccordionSummary
                                                            expandIcon={<ExpandMoreIcon />}
                                                            aria-controls='panel1bh-content'
                                                            id='panel1bh-header'
                                                            className={classes.accordion}
                                                        >
                                                            <Typography className={classes.heading}>Rut: {help.user[0].rut} </Typography>
                                                            <Typography className={classes.secondaryHeading}>Alertas ({help.puntos.length}) </Typography>
                                                        </AccordionSummary>
                                                        <AccordionDetails className={classes.accordionDetails}>
                                                            <Grid container className={classes.contUsers} key={index}>

                                                                {
                                                                    help.puntos.slice(0).reverse().map((point, index) => (
                                                                        <Grid container className={classes.contUsersMap} key={index}>
                                                                            <Grid item xs={12} sm={1} className={classes.listGrid}>
                                                                                <Typography className={classes.typho} color='primary'>
                                                                                    <b className={classes.b}>№ </b> <br />
                                                                                    {index + 1}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                                <Typography className={classes.typho} color='primary'>
                                                                                    <b className={classes.b}>Email </b> <br />
                                                                                    {help.user[0].email}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                                <Typography className={classes.typho} color='primary'>
                                                                                    <b className={classes.b}>Fecha </b>  <br />
                                                                                    {new Date(point.date).toLocaleDateString()}
                                                                                </Typography>
                                                                            </Grid>

                                                                            <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                                <Typography className={classes.typho} color='primary'>
                                                                                    <b className={classes.b}>Hora </b>  <br />
                                                                                    {new Date(point.date).toLocaleTimeString()}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={1} className={classes.listGrid}>
                                                                                <Typography className={classes.typho} color='primary'>
                                                                                    <b className={classes.b}>Puntos </b>  <br />
                                                                                    {point.coordinates.length}
                                                                                </Typography>
                                                                            </Grid>
                                                                            <Grid item xs={12} sm={1} className={classes.listGrid} style={{ display: 'flex' }}>
                                                                                <IconButton edge='end' style={{ margin: 'auto', display: 'flex' }} aria-label='delete' onClick={() => showDatasUser(help.user[0].rut, index)}>
                                                                                    <PlayCircleOutlineIcon />
                                                                                </IconButton>
                                                                            </Grid>
                                                                        </Grid>

                                                                    ))
                                                                }
                                                            </Grid>
                                                        </AccordionDetails>
                                                    </Accordion>
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    helpSOS.User.map((help, index) => (
                                        <div key={index} >
                                            <Accordion expanded={expanded === 'panel' + index} onChange={handleChange('panel' + index)}>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls='panel1bh-content'
                                                    id='panel1bh-header'
                                                    className={classes.accordion}
                                                >
                                                    <Typography className={classes.heading}>Rut: {help.user[0].rut} </Typography>
                                                    <Typography className={classes.secondaryHeading}>Alertas ({help.puntos.length}) </Typography>
                                                </AccordionSummary>
                                                <AccordionDetails className={classes.accordionDetails}>
                                                    <Grid container className={classes.contUsers} key={index}>

                                                        {
                                                            help.puntos.slice(0).reverse().map((point, index) => (
                                                                <Grid container className={classes.contUsersMap} key={index}>
                                                                    <Grid item xs={12} sm={1} className={classes.listGrid}>
                                                                        <Typography className={classes.typho} color='primary'>
                                                                            <b className={classes.b}>№ </b> <br />
                                                                            {index + 1}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                        <Typography className={classes.typho} color='primary'>
                                                                            <b className={classes.b}>Email </b> <br />
                                                                            {help.user[0].email}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                        <Typography className={classes.typho} color='primary'>
                                                                            <b className={classes.b}>Fecha </b>  <br />
                                                                            {new Date(point.date).toLocaleDateString()}
                                                                        </Typography>
                                                                    </Grid>

                                                                    <Grid item xs={12} sm={3} className={classes.listGrid}>
                                                                        <Typography className={classes.typho} color='primary'>
                                                                            <b className={classes.b}>Hora </b>  <br />
                                                                            {new Date(point.date).toLocaleTimeString()}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={1} className={classes.listGrid}>
                                                                        <Typography className={classes.typho} color='primary'>
                                                                            <b className={classes.b}>Puntos </b>  <br />
                                                                            {point.coordinates.length}
                                                                        </Typography>
                                                                    </Grid>
                                                                    <Grid item xs={12} sm={1} className={classes.listGrid} style={{ display: 'flex' }}>
                                                                        <IconButton edge='end' style={{ margin: 'auto', display: 'flex' }} aria-label='delete' onClick={() => showDatasUser(help.user[0].rut, index)}>
                                                                            <PlayCircleOutlineIcon />
                                                                        </IconButton>
                                                                    </Grid>
                                                                </Grid>

                                                            ))
                                                        }
                                                    </Grid>
                                                </AccordionDetails>
                                            </Accordion>
                                        </div>

                                    ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}

export default ViewAlert