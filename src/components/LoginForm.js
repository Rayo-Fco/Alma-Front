import React, { useState } from 'react';
import { useEffect } from "react";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/LogoAlma.png';
import useLogin from '../hooks/useLogin';
import { useLocation } from 'wouter';
import { makeStyles } from '@material-ui/core/styles'
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import '../css/login.css'
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import EmailIcon from '@material-ui/icons/Email';
import { Paper, Grid, FormControl, TextField, Button, Typography, InputAdornment } from '@material-ui/core';

const usesStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
        marginBottom: theme.spacing(5),
        paddingTop: theme.spacing(4),
        height: 'auto',
        width: '40%',
        backgroundColor: "#fd9eef",
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
}))

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [, navigate] = useLocation()
    const { login, isLogged, hasLoginError } = useLogin()
    const classes = usesStyles();

    const handleSubmit = async (e) => {
        login({ email, password })
    };

    useEffect(() => {
        if (isLogged) {
            navigate('/principal')
        }
    }, [isLogged, navigate])

    return (
        <>
            <Paper className={classes.container} elevation={15}>
                <img src={logo} style={{ width: "250px", marginBottom: "30px" }} alt="Logo" />
                <Typography className={classes.typograph} variant="h4" color="initial">
                    Iniciar sesión
                </Typography>
                {hasLoginError &&
                    <div className="alert alert-danger alert-styled-left">
                        Correo y/o contraseña inválidos
                    </div>
                }
                <Grid container spacing={3}>
                    <FormControl className={classes.grdC}>
                        <TextField
                            className={classes.input}
                            label="Correo electrónico"
                            type="text"
                            variant="filled"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            className={classes.input}
                            label="Contraseña"
                            type="password"
                            variant="filled"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <VpnKeyIcon />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            variant="contained"
                            className={classes.button}
                            color="primary"
                            onClick={() => handleSubmit()}
                            startIcon={<ExitToAppIcon />}>
                            Iniciar sesión
                        </Button>
                    </FormControl>
                </Grid>
            </Paper>
        </>
    );
}
