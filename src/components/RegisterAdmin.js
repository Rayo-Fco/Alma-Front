import React from 'react';
import { Paper, Grid, FormControl, TextField, Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const usesStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBot: theme.spacing(5),
        height: 500,
        width: '40%',
    },
    grdC: {
        margin: 'auto',
        width: '85%'
    },
    input: {
        marginTop: theme.spacing(1)
    }
}))

function RegisterAdmin(props) {
    const classes = usesStyles();

    return (
        <Paper className={classes.container} elevation={15}>
            <Typography variant="h1" color="initial">
                Registro de Admin
            </Typography>
            <Grid container spacing={3}>
                <FormControl className={classes.grdC}>
                    <TextField
                        className={classes.input}
                        id=""
                        label="Nombre"
                        variant="outlined"
                    />
                    <TextField
                        className={classes.input}
                        id=""
                        label="Apellido"
                        variant="outlined"
                    />
                    <TextField
                        className={classes.input}
                        id=""
                        type=""
                        label="Email"
                        variant="outlined"
                    />
                    <TextField
                        className={classes.input}
                        id=""
                        label="Contraseña"
                        type="password"
                        variant="outlined"
                    />
                     <TextField
                        className={classes.input}
                        id=""
                        label="Repetir contraseña"
                        type="password"
                        variant="outlined"
                    />
                    <Button
                        variant="contained"
                        className={classes.input}
                        color="primary">
                        Registrar
                </Button>
                </FormControl>
            </Grid>
        </Paper>
    );
}

export default RegisterAdmin;