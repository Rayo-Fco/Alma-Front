import React, { useState, useEffect } from 'react'
import { Select, TextField, Grid, MenuItem, InputLabel, Paper, Button, makeStyles, FormControl, Typography, InputAdornment, CircularProgress } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save'
import MapView from './MapView'
import { selectActiveLatLng } from '../reducers/latLngReducer'
import { connect } from "react-redux"
import { sendLatLng } from '../actions/latLngAction'
import useAddMarker from '../hooks/useAddMarker'
import { useLocation } from 'wouter'
import Alert from '@material-ui/lab/Alert';
import { refreshMarker } from '../actions/markerAction'
import { selectActiveMarker } from '../reducers/markerReducer'

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
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80'
    },
    formControl: {
        minWidth: 120,
    },
    typo: {
        fontFamily: 'helvetica',
        fontSize: 30,
    },
    progress: {
        height: '80vh',
        paddingTop: '70%'
    },
    circular: {
        color: '#fd9eef'
    },
    alert: {
        textAlign: 'left'
    }
}));

const mapStateToProps = state => {
    return {
        marker: selectActiveMarker(state),
        latlng: selectActiveLatLng(state)
    }
}

function AddMarker({ latlng, refreshMarker, marker, }) {
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

        refreshMarker(!marker) 
    }

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }


    return (

        <div className={classes.root}>

            <Grid container>
                <Grid item xs={12} sm={7}>
                    <MapView>
                    </MapView>
                </Grid>
                <Grid item xs={8} sm={5} id="gridAddmarker">
                    <Grid item className={classes.gridform}  >
                        <Paper className={classes.paperform} elevation={15}>
                            {isAddLoading &&
                                <div className={classes.progress}>
                                    <CircularProgress className={classes.circular} style={{ width: '20%', height: '20%', }} />
                                </div>
                            }
                            {!isAddLoading &&
                                <FormControl onKeyPress={(e) => onKeyUpValue(e)}>
                                    <Typography className={classes.typo} color="primary">
                                        Agregar marcador
                                </Typography>
                                    {hasAddError &&
                                        <Alert className={classes.alert} variant="filled" severity="error">
                                            {errorMsj.map(error => {
                                                return (
                                                    <div key={error}>
                                                        *{error} <br />
                                                    </div>
                                                )
                                            })}
                                        </Alert>
                                    }
                                    {succeedAdd &&
                                        <Alert className={classes.alert} variant="filled" severity="success">
                                            Se ha agregado el marcador
                                        </Alert>
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
export default connect(mapStateToProps, { sendLatLng, refreshMarker})(AddMarker)
