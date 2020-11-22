import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Typography, IconButton, TextField, Button, List } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import useFindHelpSOS from '../hooks/useFindHelpSOS';
import { useLocation } from 'wouter';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { useRut } from 'react-rut';

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
        backgroundColor: '#dedede',
        marginBottom: 10,
        borderTop: '1px solid black',
        borderBottom: '1px solid black'
    }
}))

function ViewAlert(props) {
    const classes = useStyles();
    const [helpSOS2, setHelpSOS2] = useState({ User: [] })
    const [helpSOS, setHelpSOS] = useState({ User: [] })
    const [, navigate] = useLocation()
    const { findhelpsos, helpsos } = useFindHelpSOS()
    const [{ formattedValue }, setRut] = useRut();

    useEffect(() => {
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        axios.get('http://localhost:3001/helpSOS/all', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                console.log(res.data);
                if (isMounted) {
                    setHelpSOS({ User: res.data })
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
    }, [setHelpSOS])

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort();
    }, [navigate])

    useEffect(() => {
        if (helpsos) {
            setHelpSOS2({ User: helpsos })
        }
    }, [helpsos])

    const showDatasUser = (user) => {
        navigate(`/needhelp/${user}`)
    }

    const handleSubmit = e => {
        const rut = formattedValue
        findhelpsos({ rut })
        console.log(helpsos)
        console.log(formattedValue)
    };

    return (
        <Container >
            <Grid container className={classes.cnt}>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.cnt}>
                        <Typography className={classes.typ} color="primary">
                            Ver alertas
                        </Typography>
                        <Grid item xs={12} className={classes.gridForm}>
                            <TextField
                                className={classes.input}
                                value={formattedValue}
                                onChange={(e) => setRut(e.target.value)}
                                label="Rut"
                                variant="outlined"
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
                        <List>
                            {
                                helpsos
                                    ?
                                    <>
                                        {
                                            helpSOS2.User.map((help, index) => (
                                                <Grid container className={classes.contUsers} key={index}>
                                                    <Grid item xs={12} sm={4} className={classes.listGrid}>
                                                        <Typography className={classes.typho} color="primary">
                                                            <b className={classes.b}>Email </b> <br />
                                                            {help.user[0].email}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} sm={4} className={classes.listGrid}>
                                                        <Typography className={classes.typho} color="primary">
                                                            <b className={classes.b}>Rut </b>  <br />
                                                            {help.user[0].rut}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12} sm={2} className={classes.listGrid}>
                                                        <Typography className={classes.typho} color="primary">
                                                            <b className={classes.b}>Puntos </b>  <br />
                                                            {help.puntos.length}
                                                        </Typography>
                                                    </Grid>

                                                    <Grid item xs={12} sm={1} className={classes.listGrid} style={{ display: 'flex' }}>
                                                        <IconButton edge="end" style={{ margin: 'auto', display: 'flex' }} aria-label="delete" onClick={() => showDatasUser()}>
                                                            <PlayCircleOutlineIcon />
                                                        </IconButton>
                                                    </Grid>
                                                </Grid>
                                            ))
                                        }
                                    </>
                                    :
                                    helpSOS.User.map((help, index) => (
                                            <Grid container className={classes.contUsers} key={index} >
                                                <Grid item xs={12} sm={4} className={classes.listGrid}>
                                                    <Typography className={classes.typho} color="primary">
                                                        <b className={classes.b}>Email </b> <br />
                                                        {help.user[0].email}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={4} className={classes.listGrid}>
                                                    <Typography className={classes.typho} color="primary">
                                                        <b className={classes.b}>Rut </b>  <br />
                                                        {help.user[0].rut}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={2} className={classes.listGrid}>
                                                    <Typography className={classes.typho} color="primary">
                                                        <b className={classes.b}>Puntos </b>  <br />
                                                        {help.puntos.length}
                                                    </Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={1} className={classes.listGrid} style={{ display: 'flex' }}>
                                                    <IconButton edge="end" style={{ margin: 'auto', display: 'flex' }} aria-label="delete" onClick={() => showDatasUser(help.user[0].rut)}>
                                                        <PlayCircleOutlineIcon />
                                                    </IconButton>
                                                </Grid>
                                            </Grid>

                                    ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ViewAlert;