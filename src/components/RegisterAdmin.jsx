import React, { useState } from 'react'
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import useSignup from '../hooks/useSignup'
import AddBoxIcon from '@material-ui/icons/AddBox'
import Alert from '@material-ui/lab/Alert'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(8),
        marginBottom: theme.spacing(5),
        paddingTop: theme.spacing(4),
        height: 'auto',
        width: '65%',
    },
    grdC: {
        margin: 'auto',
        width: '85%',
        marginTop: 20,
    },
    input: {
        marginTop: theme.spacing(1)
    },
    typ: {
        fontSize: 50,
        fontFamily: 'Arial',
    },
    alert: {
        textAlign:'left'
    }
}))

function RegisterAdmin(props) {
    const classes = useStyles()
    const [email, setEmail] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const { signupadmin, isSignupLoading, hasSignError, succeedSign, errorMsj } = useSignup()

    const handleSubmit = (e) => {
        signupadmin({ email, nombre, apellido, password1, password2 })
    }

    return (
        <>
            {isSignupLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isSignupLoading &&
                <Paper className={classes.container} elevation={15}>
                    <Typography className={classes.typ} color='primary'>
                        Registro de Admin
                     </Typography>

                    {hasSignError &&
                        <Alert className={classes.alert} variant='filled' severity='error'>
                            {errorMsj.map(error => {
                                return (
                                    <div key={error}>
                                        *{error} <br />
                                    </div>
                                )
                            })}
                        </Alert>
                    }
                    {succeedSign &&
                        <Alert className={classes.alert} variant='filled' severity='error'>
                            Se ha registrado satisfactoriamente
                </Alert>
                    }
                    <Grid container spacing={3}>
                        <FormControl className={classes.grdC}>
                            <TextField
                                className={classes.input}
                                label='Nombre'
                                variant='outlined'
                                onChange={(e) => setNombre(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                label='Apellido'
                                variant='outlined'
                                onChange={(e) => setApellido(e.target.value)}
                            />
                            <TextField
                                className={classes.input}

                                label='Email'
                                variant='outlined'
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                label='Contraseña'
                                type='password'
                                variant='outlined'
                                onChange={(e) => setPassword1(e.target.value)}
                            />
                            <TextField
                                className={classes.input}
                                label='Repetir contraseña'
                                type='password'
                                variant='outlined'
                                onChange={(e) => setPassword2(e.target.value)}
                            />
                            <Button
                                variant='contained'
                                className={classes.input}
                                color='primary'
                                onClick={() => handleSubmit()}
                                startIcon={<AddBoxIcon />}>
                                Registrar
                            </Button>
                        </FormControl>
                    </Grid>
                </Paper>
            }
        </>
    )
}

export default RegisterAdmin
