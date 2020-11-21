import React, { useState, useEffect } from 'react'
import { TextField, Grid } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import { Button, makeStyles, FormControl, Typography } from "@material-ui/core"
import MapView from './MapView'
import { selectActiveIdMarker } from '../reducers/idMarkerReducer'
import { connect } from "react-redux"
import { sendIdMarker } from '../actions/idMarkerAction'
import useDeleteMarker from '../hooks/useDeleteMarker'
import { useLocation } from 'wouter'
import CircularProgress from '@material-ui/core/CircularProgress'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
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
        idmarker: selectActiveIdMarker(state)
    }
}

function DeleteMarker({ idmarker }) {
    const classes = useStyles();
    const [idMarker, setIdMarker] = useState('')
    const [, navigate] = useLocation()
    const { deletemarker, hasDeleteError, succeedDelete, isDeleteLoading, errorMsj } = useDeleteMarker()

    useEffect(() => {
        setIdMarker(idmarker)

    }, [idmarker])

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort();
    }, [navigate])

    const handleSubmit = () => {
        deletemarker({ idMarker })
    };
    return (

        <div className={classes.root}>

            <Grid container >
                <Grid item xs={12} sm={7}>
                    <MapView></MapView>
                </Grid>
                <Grid item xs={8} sm={5} id="gridAddmarker">
                    <Grid item className={classes.gridform} >
                        <Paper className={classes.paperform} elevation={15}>
                            {isDeleteLoading &&
                                <div className={classes.progress}>
                                    <CircularProgress className={classes.circular} style={{ width: '20%', height: '20%', }} />
                                </div>
                            }
                            {!isDeleteLoading &&
                                <FormControl>
                                    <Typography className={classes.typo}>
                                        Eliminar marcador
                                </Typography>
                                    {hasDeleteError &&
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
                                    {succeedDelete &&
                                        <div className="alert alert-success alert-styled-left">
                                            Se ha eliminado el marcador
                                    </div>
                                    }
                                    <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                                        <Grid item xs zeroMinWidth>
                                            <TextField className={classes.input} label="ID del marcador" variant="outlined" onChange={(e) => setIdMarker(e.target.value)} />
                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        size="large"
                                        className={classes.button}
                                        onClick={() => handleSubmit()}
                                        startIcon={<DeleteForeverIcon />}>
                                        Eliminar
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
export default connect(mapStateToProps, { sendIdMarker })(DeleteMarker)
