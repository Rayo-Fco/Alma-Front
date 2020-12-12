import React, { useState, useEffect } from 'react'
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import api from '../services/api'
import axios from 'axios'
import useResetPassword from '../hooks/useResetPassword'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        height: 'auto',
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
    },
    alert: {
        textAlign: 'left'
    }
}))

export default function ResetPassword() {
    useEffect(() => {
        window.scrollTo(0, 0)
        const search = window.location.search
        const params = new URLSearchParams(search)
        const email = params.get('email')
        const token = params.get('token')
        let source = axios.CancelToken.source()

        api.get(`/login/reset_password`, {
            cancelToken: source.token,
        })
            .then(res => {

            })

        return () => {

        }
    }, [])

    const classes = useStyles();
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const { resetpassword, hasResetError, succeedReset, isResetLoading, errorMsj } = useResetPassword()

    const handleSubmit = async (e) => {
        resetpassword({ password1, password2 })
    };

    return (

        <>
            {isResetLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isResetLoading &&
                <Paper className={classes.container} elevation={15}>
                    <Grid className={classes.cntainer} item xs={12}>
                        <Typography className={classes.typ} color="primary">
                            Restablecer contraseña
                        </Typography>
                        {hasResetError &&
                            <Alert className={classes.alert} variant="filled" severity="error">
                                {errorMsj.map(error => {
                                    return (
                                        <div key={error}>
                                            *{error} <br />
                                        </div>
                                    )
                                })}
                            </Alert>}
                        {succeedReset &&
                            <Alert className={classes.alert} variant="filled" severity="success">
                                Se ha registrado con exito
                            </Alert>
                        }
                    </Grid>
                    <Grid container spacing={3}>
                        <FormControl className={classes.grdC}>
                            <TextField
                                type="password"
                                className={classes.input}
                                label="Ingrese la nueva contraseña"
                                variant="outlined"
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                            <TextField
                                type="password"
                                className={classes.input}
                                label="Ingrese nuevamente la contraseña"
                                variant="outlined"
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <Button
                                variant="contained"
                                className={classes.input}
                                color="primary"
                                startIcon={<EditIcon />}
                                onClick={() => handleSubmit()}
                            >
                                Cambiar contraseña
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


