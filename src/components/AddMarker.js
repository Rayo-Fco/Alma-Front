import React, { useState, useEffect } from 'react'
import { Select, TextField, Grid, MenuItem, InputLabel } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles, FormControl, Typography } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import MapView from './MapView'
import { selectActiveLatLng } from '../reducers/latLngReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/latLngAction'
import InputAdornment from '@material-ui/core/InputAdornment';
import useAddMarker from '../hooks/useAddMarker';
import { useLocation } from 'wouter';
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
        width: '80%'
    },
    paperform: {
        padding: '15px',
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
        height: '80vh',
        paddingTop: '70%'
    },
    circular: {
        color: '#fd9eef'
    }
}));

const mapStateToProps = state => {
    return {
        latlng: selectActiveLatLng(state)
    }
}


function AddMarker({ latlng }) {
    const classes = useStyles();
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')
    const [, navigate] = useLocation()
    const { addmarker, hasAddError, succeedAdd, isAddLoading, errorMsj } = useAddMarker()

    useEffect(() => {
        setLatitude(latlng.lat)
        setLongitude(latlng.lng)
    }, [latlng])

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort();
    }, [navigate])



    const handleSubmit = () => {
        addmarker({ category, title, latitude, longitude })
    };
    return (

        <div className={classes.root}>

            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <MapView></MapView>
                </Grid>
                <Grid item xs={4}>
                    <Grid item className={classes.gridform} >
                        <Paper className={classes.paperform} elevation={15}>
                            {isAddLoading &&
                                <div className={classes.progress}>
                                    <CircularProgress className={classes.circular} style={{ width: '20%', height: '20%', }} />
                                </div>
                            }
                            {!isAddLoading &&
                                <FormControl>
                                    <Typography className={classes.typo}>
                                        Agregar marcador
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
                                            Se ha agregado el marcador
                                    </div>
                                    }
                                    <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} label="Titulo" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                    <Grid container wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} value={latlng.lng || ''} label="Longitud" variant="outlined" onChange={(e) => setLongitude(e.target.value)} InputProps={{
                                                startAdornment: <InputAdornment position="start">Lng</InputAdornment>,
                                            }} />
                                        </Grid>
                                    </Grid>
                                    <Grid container wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} value={latlng.lat || ''} label="Latitud" variant="outlined" onChange={(e) => setLatitude(e.target.value)} InputProps={{
                                                startAdornment: <InputAdornment position="start">Lat</InputAdornment>,
                                            }} />
                                        </Grid>
                                    </Grid>
                                    <FormControl className={classes.formControl} variant="outlined">
                                        <InputLabel htmlFor="outlined-age-native-simple">Tipo</InputLabel>
                                        <Select
                                            className={classes.input}
                                            label="Tipo"
                                            value={category}
                                            onChange={(e) => setCategory(e.target.value)}>
                                            <MenuItem value="">
                                                <em>Ninguno</em>
                                            </MenuItem>
                                            <MenuItem value={'comisaria'}>Comisaria</MenuItem>
                                            <MenuItem value={'pdi'}>PDI</MenuItem>
                                        </Select>
                                    </FormControl>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => handleSubmit()}
                                        startIcon={<SaveIcon />}>
                                        Agregar
                                         </Button>
                                </FormControl>
                            }
                        </Paper>

                    </Grid>

                </Grid>
            </Grid>

        </div>
    )
}
export default connect(mapStateToProps, { sendLatLng })(AddMarker)
