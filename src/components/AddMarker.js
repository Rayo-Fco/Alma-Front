import React, { useEffect } from 'react'
import { TextField, Grid, MenuItem } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import { Button, makeStyles, FormControl } from "@material-ui/core";
import SaveIcon from '@material-ui/icons/Save';
import MapView from './MapView'
import { selectActiveLatLng } from '../reducers/LatLngDrawerReducer'
import { connect } from "react-redux";
import { sendLatLng } from '../actions/sendLatLngAction'
import InputAdornment from '@material-ui/core/InputAdornment';

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

    },
    input: {
        marginBottom: theme.spacing(2),
    },
    gridform: {
        margin: 'auto',
        height: '100%'

    },
    paperform: {
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80'
    }
}));

const mapStateToProps = state => {
    return {
        latlng: selectActiveLatLng(state)
    }
}


function AddMarker({ latlng, sendLatLng }) {
    const classes = useStyles();

    useEffect(() => {
        console.log(latlng)

    }, [latlng])

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <MapView></MapView>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={15}>
                        <Grid container className={classes.gr} alignItems="flex-end">
                            <Grid item className={classes.gridform} >
                                <Paper className={classes.paperform} elevation={15}>
                                    <FormControl>
                                        <TextField className={classes.input} label="Titulo" variant="outlined" />
                                        <TextField className={classes.input} value={latlng.lng} label="Longitud" variant="outlined" InputProps={{
                                            startAdornment: <InputAdornment position="start">Lng</InputAdornment>,
                                        }} />
                                        <TextField className={classes.input} value={latlng.lat} label="Latitud" variant="outlined" InputProps={{
                                            startAdornment: <InputAdornment position="start">Lat</InputAdornment>,
                                        }} />
                                        <TextField className={classes.input} id="select" label="Tipo" select variant="outlined">
                                            <MenuItem value="10">Comisarias</MenuItem>
                                            <MenuItem value="20">PDI</MenuItem>
                                        </TextField>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            size="small"
                                            className={classes.button}
                                            startIcon={<SaveIcon />}>
                                            Agregar
                                         </Button>
                                    </FormControl>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>

    )
}
export default connect(mapStateToProps, { sendLatLng })(AddMarker)
