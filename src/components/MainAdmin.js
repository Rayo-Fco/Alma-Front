import React from 'react'
import { Paper, Container, Grid, Typography, GridList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import GraficoBotones from './ButtonGraph';
import GraficoUsuarios from './UserGraph';
import ListComunas from './ListCommunes';
import SeleccionFecha from './DateSelection' 

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    container: {
        marginTop: theme.spacing(3)
    },
    paper: {
        width: 'auto',
        height: 1200,
        padding: theme.spacing(2),
        backgroundColor: '#ECE9E8',
        marginBottom: 50,
    },
    paper2: {
        color: theme.palette.text.secondary,
    },
    tittle: {
        textAlign: 'left'
    },
    orange: {
        color: theme.palette.getContrastText(deepOrange[500]),
        backgroundColor: deepOrange[500],
    },
    gridList: {
        width: 'auto',
        height: 600,
    },
}))


export default function PrincipalAdmin() {
    const classes = useStyles()
    return (
        <Container maxWidth="xl" fixed className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper2}>
                            <div className={classes.root}>
                                <Avatar className={classes.orange}>A</Avatar>
                                <Typography variant="h4" className={classes.tittle}>
                                    Admin
                            </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper2} >
                            <div className={classes.root} >
                                    <SeleccionFecha style={{margin:'auto'}}/>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                            <GraficoBotones />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                            <GraficoUsuarios />
                        </Paper>
                    </Grid>
                    <Grid item xs={12}>
                        <Paper className={classes.paper2}>
                            <GridList cellHeight={160} className={classes.gridList} cols={3}>
                                <ListComunas />
                            </GridList>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}