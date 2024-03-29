import React, { useState } from 'react'
import { useEffect } from 'react'
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import logo from '../img/LogoAlma.png'
import useLogin from '../hooks/useLogin'
import { useLocation } from 'wouter'
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import '../css/login.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import EmailIcon from '@material-ui/icons/Email'
import { Paper, Grid, FormControl, TextField, Button, Typography, InputAdornment } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress'
import Alert from '@material-ui/lab/Alert'
import { sendAuth } from '../actions/authAction'
import { connect } from 'react-redux'

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        minWidth: '385px'

    },
    paper: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
        marginBottom: theme.spacing(5),
        paddingTop: theme.spacing(4),
        height: 'auto',
        backgroundColor: '#fd9eef',
        borderRadius: '10px'
    },
    grdC: {
        margin: 'auto',
        width: '85%'
    },
    input: {
        marginTop: theme.spacing(3),
        backgroundColor: 'white'
    },
    typograph: {
        marginBottom: theme.spacing(3),
        fontWeight: 400,
    },
    button: {
        marginTop: theme.spacing(3),
    },
    progress: {
        height: '90vh',
        paddingTop: '20%'
    },
    circular: {
        color: '#fd9eef'
    },
    alert: {
        textAlign:'left'
    }
}))

 function LoginForm({ sendAuth }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [, navigate] = useLocation()
    const { login, isLogged, hasLoginError, isLoginLoading } = useLogin()
    const classes = useStyles()

    const handleSubmit = async (e) => {
        login({ email, password })
    }

    useEffect(() => {
        if (isLogged) {
            sendAuth(true)
            navigate('/principal')
        }
    }, [isLogged, navigate, sendAuth])

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }

    return (
        <>
            {isLoginLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isLoginLoading &&
                <Grid container>
                    <Grid item xs={6} sm={6} className={classes.container}>
                        <Paper className={classes.paper} elevation={15}>
                            <img src={logo} style={{ width: '250px', marginBottom: '30px' }} alt='Logo' />
                            <Typography className={classes.typograph} variant='h4' color='initial'>
                                Iniciar sesión
                            </Typography>
                            {hasLoginError &&
                                <Alert className={classes.alert} variant='filled' severity='error'>
                                    Correo y/o contraseña inválidos
                                  </Alert>
                            }

                            <FormControl className={classes.grdC} onKeyPress={(e) => onKeyUpValue(e)} >
                                <TextField
                                    className={classes.input}
                                    label='Correo electrónico'
                                    type='text'
                                    variant='filled'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <TextField
                                    className={classes.input}
                                    label='Contraseña'
                                    type='password'
                                    variant='filled'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position='start'>
                                                <VpnKeyIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Button
                                    variant='contained'
                                    className={classes.button}
                                    color='primary'
                                    onClick={() => handleSubmit()}
                                    startIcon={<ExitToAppIcon />}>
                                    Iniciar sesión
                             </Button>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>

            }
        </>
    )
}
export default connect(null, { sendAuth })(LoginForm)
