import React from 'react'
import { Paper, Grid, FormControl, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SubdirectoryArrowLeftIcon from '@material-ui/icons/SubdirectoryArrowLeft'
import { useLocation } from 'wouter'

const useStyles = makeStyles((theme) => ({

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
export default function Nothing() {

    const classes = useStyles();
    const [, navigate] = useLocation()

    return (
        <div>
            <Grid item className={classes.gridform} >
                <Paper className={classes.paperform} elevation={15}>
                    <FormControl>
                        <Typography className={classes.title}>
                            Oops
                        </Typography>
                        <Typography className={classes.paragraph}>
                            Lamentablemente la página solicitada no fue encontrada en nuestro servidor web.
                       </Typography>
                        <Grid container style={{ marginTop: '8px' }} wrap="nowrap" spacing={3}>
                            <Grid item xs zeroMinWidth>
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            size="large"
                            className={classes.button}
                            onClick={() => navigate('/')}
                            startIcon={<SubdirectoryArrowLeftIcon />}>
                            Volver al inicio
                        </Button>
                    </FormControl>
                </Paper>
            </Grid>
        </div>
    )
}
