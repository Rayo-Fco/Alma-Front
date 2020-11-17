import React, { useState, useEffect } from 'react';
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save';
import useAddCommunes from '../hooks/useAddCommunes'
import { useLocation } from 'wouter'
import CircularProgress from '@material-ui/core/CircularProgress'

const usesStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBot: theme.spacing(5),
        height: 470,
        width: '65%',
    },
    grdC: {
        margin: 'auto',
        width: '85%',
        marginTop: 10
    },
    input: {
        marginTop: theme.spacing(1)
    },
    typ: {
        fontSize: 50,
        fontFamily: 'Arial',
    },
    cntainer: {
        paddingTop: 10
    },
    progress: {
        height: '90vh',
        paddingTop: '20%'
    },
    circular: {
        color: '#fd9eef'
    }
}))


function RegistroComuna() {
    const { addcommunes,isAddLoading ,hasAddError, errorMsj, succeedAdd } = useAddCommunes()
    const [commune, setCommune] = useState('')
    const [phone, setPhone] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [, navigate] = useLocation()


    const classes = usesStyles();

    const handleSubmit = () => {
        addcommunes({ commune, phone, latitude, longitude })
    };

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        }
        return () => ac.abort();
    }, [navigate])


    return (
        <>
            {isAddLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isAddLoading &&
                <Paper className={classes.container} elevation={15}>
                    <Grid className={classes.cntainer} item xs={12}>
                        <Typography className={classes.typ} color="primary">
                            Registro de Comuna
                    </Typography>
                        {hasAddError &&
                            <div className="alert alert-danger alert-styled-left">
                                {errorMsj.map(error => {
                                    return (
                                        <div key={error}>
                                            *{error} <br />
                                        </div>
                                    )
                                })}
                            </div>
                        }
                        {succeedAdd &&
                            <div className="alert alert-success alert-styled-left">
                                Se ha registrado con exito
                        </div>
                        }
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.grdC}>
                            <TextField
                                className={classes.input}
                                label="Nombre comuna"
                                variant="outlined"
                                onChange={(e) => setCommune(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                label="Telefono"
                                variant="outlined"
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                label="Latitud"
                                variant="outlined"
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                id=""
                                label="Longitud"
                                variant="outlined"
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                className={classes.input}
                                color="primary"
                                startIcon={<SaveIcon />}
                                onClick={() => handleSubmit()}
                            >
                                Registrar
                </Button>
                        </FormControl>
                    </Grid>
                </Paper>
            }
            <div style={{ height: '150px' }}>
            </div>
        </>
    );
}

export default RegistroComuna;