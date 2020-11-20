import React, { useState, useEffect } from 'react'
import { Select, TextField, Grid, MenuItem, InputLabel } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { Button, makeStyles, FormControl, Typography } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save'
import MapView from './MapView'
import { connect } from "react-redux"
import { sendIdMarker } from '../actions/IdMarkerAction'
import useEditMarker from '../hooks/useEditMarker'
import { useLocation } from 'wouter'
import CircularProgress from '@material-ui/core/CircularProgress'

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



function EditMarker() {
    const classes = useStyles();
    const [category, setCategory] = useState('')
    const [title, setTitle] = useState('')
    const [, navigate] = useLocation()
    const { editmarker, hasEditError, succeedEdit, isEditLoading, errorMsj } = useEditMarker()


    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort();
    }, [navigate])



    const handleSubmit = () => {
        editmarker({ category, title })
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
                            {isEditLoading &&
                                <div className={classes.progress}>
                                    <CircularProgress className={classes.circular} style={{ width: '20%', height: '20%', }} />
                                </div>
                            }
                            {!isEditLoading &&
                                <FormControl>
                                    <Typography className={classes.typo}>
                                        Agregar marcador
                                </Typography>
                                    {hasEditError &&
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
                                    {succeedEdit &&
                                        <div className="alert alert-success alert-styled-left">
                                            Se ha agregado el marcador
                                    </div>
                                    }

                                    <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} label="ID del marcador" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
                                        </Grid>
                                    </Grid>

                                    <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} label="Titulo" variant="outlined" onChange={(e) => setTitle(e.target.value)} />
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
export default connect(null, { sendIdMarker })(EditMarker)
