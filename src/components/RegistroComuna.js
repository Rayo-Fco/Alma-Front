import React from 'react';
import { Paper, Grid, FormControl, TextField, Button, Typography, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save';



const usesStyles = makeStyles((theme) => ({
    container: {
        margin: 'auto',
        marginTop: theme.spacing(5),
        paddingBot: theme.spacing(5),
        height: 470,
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
    }
}))


function RegistroComuna(props) {

    const classes = usesStyles();

    return (
        <div>
            <Paper className={classes.container} elevation={15}>
                <Grid className={classes.cntainer} item xs={12}>
                    <Typography className={classes.typ} color="primary">
                        Registro de Comuna
                    </Typography>
                </Grid>
                <Grid container spacing={3}>
                    <FormControl className={classes.grdC}>
                        <TextField
                            className={classes.input}
                            id=""
                            label="Nombre comuna"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            id=""
                            label="Telefono"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            id=""
                            label="Latitud"
                            variant="outlined"
                        />
                        <TextField
                            className={classes.input}
                            id=""
                            label="Longitud"
                            variant="outlined"
                        />
                        <Button
                            variant="contained"
                            className={classes.input}
                            color="primary"
                            startIcon={<SaveIcon />}
                            >
                            Registrar
                </Button>
                    </FormControl>
                </Grid>
            </Paper>
            <Container style={{ height: '150px' }}>
            </Container>
        </div>
    );
}

export default RegistroComuna;