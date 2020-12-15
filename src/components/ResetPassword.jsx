import React, { useState, useEffect } from 'react'
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import api from '../services/api'
import axios from 'axios'
import useResetPassword from '../hooks/useResetPassword'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import { useLocation } from 'wouter'

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
    },

    paper: {
        height: '92%',
        backgroundColor: '#e0dfdf',
    },
    gridform: {
        margin: 'auto',
        height: '100%',
        minWidth: '440px',
        maxWidth: '440px',
        marginBottom: '10%',
        marginTop: '10%'
    },
    paperform: {
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80'
    },
    title: {
        fontFamily: 'helvetica',
        fontSize: 20,
    },
    paragraph: {
        fontFamily: 'helvetica',
        fontSize: 13,
        color: '#777777',
        textAlign: 'left'
    },
}))

export default function ResetPassword() {
    const classes = useStyles()
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const { resetpassword, hasResetError, succeedReset, isResetLoading, errorMsj } = useResetPassword()
    const [validate, setValidate] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [, navigate] = useLocation()
    const search = window.location.search
    const params = new URLSearchParams(search)
    const email = params.get('email')
    const token = params.get('token')

    useEffect(() => {
        window.scrollTo(0, 0)
        const search = window.location.search
        const params = new URLSearchParams(search)
        const email = params.get('email')
        const token = params.get('token')
        let source = axios.CancelToken.source()
        const query = async () => {
            await api.get(`/login/reset_password`,
                {
                    params: {
                        email: email,
                        token: token
                    },
                    cancelToken: source.token,
                })
                .then(res => {
                    setIsLoading(false)
                    setValidate(true)
                })
                .catch(function (e) {
                    setIsLoading(false)
                    setValidate(false)

                })
        }
        query()
        return () => {

        }
    }, [])



    const handleSubmit = async (e) => {
        resetpassword({ password1, password2, email, token })
    }

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }

    return (
        <>
            {isLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!validate
                ?
                <Grid item className={classes.gridform} >
                    <Paper className={classes.paperform} elevation={15}>
                        <FormControl>
                            <Typography className={classes.title}>
                                El link ha expirado o está mal escrito
                            </Typography>
                            <Typography className={classes.paragraph}>
                                Recuerda que para restablecer la contraseña tienes un tiempo límite de 5 minutos.
                            </Typography>
                            <Grid container style={{ marginTop: '8px' }} wrap='nowrap' spacing={3}>
                                <Grid item xs zeroMinWidth>
                                </Grid>
                            </Grid>
                            <Button
                                variant='contained'
                                color='primary'
                                size='large'
                                className={classes.button}
                                onClick={() => navigate('/')}
                                startIcon={<SubdirectoryArrowLeftIcon />}>
                                Volver al inicio
                        </Button>
                        </FormControl>
                    </Paper>
                </Grid>
                :
                <>
                    {isResetLoading &&
                        <div className={classes.progress}>
                            <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                        </div>
                    }
                    {!isResetLoading &&
                        <>
                            {
                                succeedReset
                                    ?
                                    <Grid item className={classes.gridform} >
                                        <Paper className={classes.paperform} elevation={15}>
                                            <FormControl>
                                                <Typography className={classes.title}>
                                                    ¡Se ha cambiado exitosamente la contraseña!
                                                    </Typography>
                                                <Grid container style={{ marginTop: '8px' }} wrap='nowrap' spacing={3}>
                                                    <Grid item xs zeroMinWidth>
                                                    </Grid>
                                                </Grid>
                                                <Button
                                                    variant='contained'
                                                    color='primary'
                                                    size='large'
                                                    className={classes.button}
                                                    onClick={() => navigate('/')}
                                                    startIcon={<SubdirectoryArrowLeftIcon />}>
                                                    Volver al inicio
                                                    </Button>
                                            </FormControl>
                                        </Paper>
                                    </Grid>
                                    :
                                    <Paper className={classes.container} elevation={15}>
                                        <Grid className={classes.cntainer} item xs={12}>
                                            <Typography className={classes.typ} color='primary'>
                                                Restablecer contraseña
                                            </Typography>
                                            {hasResetError &&
                                                <Alert className={classes.alert} variant='filled' severity='error'>
                                                    {errorMsj.map(error => {
                                                        return (
                                                            <div key={error}>
                                                                *{error} <br />
                                                            </div>
                                                        )
                                                    })}
                                                </Alert>}

                                            <Grid container spacing={3}>
                                                <FormControl onKeyPress={(e) => onKeyUpValue(e)} className={classes.grdC}>
                                                    <TextField
                                                        type='password'
                                                        className={classes.input}
                                                        label='Ingrese la nueva contraseña'
                                                        variant='outlined'
                                                        onChange={(e) => setPassword1(e.target.value)} />
                                                    <TextField
                                                        type='password'
                                                        className={classes.input}
                                                        label='Ingrese nuevamente la contraseña'
                                                        variant='outlined'
                                                        onChange={(e) => setPassword2(e.target.value)} />
                                                    <Button
                                                        type='submit'
                                                        variant='contained'
                                                        className={classes.input}
                                                        color='primary'
                                                        startIcon={<EditIcon />}
                                                        onClick={() => handleSubmit()}>
                                                        Cambiar contraseña
                                                </Button>
                                                </FormControl>
                                            </Grid>

                                        </Grid>

                                    </Paper>
                            }
                        </>
                    }
                </>
            }

            <div style={{ height: '150px' }}>
            </div>

        </>
    )
}


