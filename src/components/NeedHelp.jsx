import React, { useState, useEffect } from 'react'
import Paper from '@material-ui/core/Paper'
import { Button, makeStyles, FormControl, Typography } from "@material-ui/core"
import { TextField, Grid } from '@material-ui/core'
import LockOpenIcon from '@material-ui/icons/LockOpen'
import { useLocation } from 'wouter';
import useFindHelpToken from '../hooks/useFindHelpToken';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
    input: {
        marginBottom: theme.spacing(2),
        width: '100%'
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
        color: '#777777'
    },
    progress: {
        height: '90vh',
        paddingTop: '20%'
    },
    circular: {
        color: '#fd9eef'
    }
}));

export default function NeedHelp() {
    const classes = useStyles();
    const [helpToken, setHelpToken] = useState('')
    const [, navigate] = useLocation()
    const { findhelptoken, succeedFind, isFindLoading, hasFindError } = useFindHelpToken()

    const handleSubmit = () => {
        findhelptoken({ helpToken })
    }

    useEffect(() => {
        console.log(succeedFind);
        if (succeedFind) {
            navigate(`/needhelp/${helpToken}`)
        }
    }, [succeedFind, navigate, helpToken])

    const onKeyUpValue = (e) => {
        if (e.charCode === 13) {
            handleSubmit()
        }
    }

    return (
        <div>
            {isFindLoading &&
                <div className={classes.progress}>
                    <CircularProgress className={classes.circular} style={{ width: '10%', height: '10%', }} />
                </div>
            }
            {!isFindLoading &&
                <Grid item className={classes.gridform} >
                    <Paper className={classes.paperform} elevation={15}>
                        <FormControl onKeyPress={(e) => onKeyUpValue(e)} > 
                            <Typography className={classes.title}>
                                Ingresa la clave de cifrado
                            </Typography>
                            {hasFindError &&
                                <Alert variant="filled" severity="error">
                                    La clave esta mal escrito o ya ha expirado
                                </Alert>
                            }
                            <Typography className={classes.paragraph}>
                                Para poder acceder al mapa, necesitas la clave de cifrado.
                            </Typography>
                            <Typography className={classes.paragraph}>
                                Si no te funciona la clave, dile al creador del enlace que te lo reenvie.
                            </Typography>
                            <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                                <Grid item xs zeroMinWidth>
                                    <TextField className={classes.input} label="Clave de cifrado" variant="outlined" onChange={(e) => setHelpToken(e.target.value)} />
                                </Grid>
                            </Grid>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={classes.button}
                                onClick={() => handleSubmit()}
                                startIcon={<LockOpenIcon />}>
                                Descifrar
                            </Button>
                        </FormControl>
                    </Paper>
                </Grid>
            }
        </div>
    )
}
