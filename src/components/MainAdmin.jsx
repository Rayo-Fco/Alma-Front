import React, { useEffect } from 'react'
import { Paper, Container, Grid, Typography, GridList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'
import { deepOrange } from '@material-ui/core/colors'
import ListCommunes from './ListCommunes'
import ListCheckIns from './ListCheckIns'
import { useLocation } from 'wouter'
import DataTable from './DataTable'

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
        height: 'auto',
        padding: theme.spacing(2),
        backgroundColor: '#ECE9E8',
        marginBottom: 50,
    },
    paperAvatar: {
        color: theme.palette.text.secondary,
        height: 'auto',
        marginBottom: '30px',
    },
    paperCommune: {
        color: theme.palette.text.secondary,
        height: 'auto',
        marginBottom: '30px',
        marginRight: 5
    },
    paperCheckin: {
        color: theme.palette.text.secondary,
        height: 'auto',
        marginBottom: '30px',
        marginLeft: 5
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
        height: 550,
    },
    gr: {
        height: 455
    },
    modal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    grDataTable: {
        margin: 'auto'
    }
}))


function MainAdmin( ) {
    const [, navigate] = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
        const ac = new AbortController()
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')
        }
        return () => ac.abort()
    }, [navigate])

    const classes = useStyles()
    return (
        <Container maxWidth='xl' className={classes.container}>
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid item xs={12}>
                        <Paper className={classes.paperAvatar}>
                            <div className={classes.root}>
                                <Avatar className={classes.orange}>A</Avatar>
                                <Typography variant='h4' className={classes.tittle}>
                                    Panel de Administrador
                                </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paperCommune}>
                            <GridList className={classes.gr}>
                                <ListCommunes />
                            </GridList>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Paper className={classes.paperCheckin}>
                            <GridList className={classes.gr}>
                                <ListCheckIns />
                            </GridList>
                        </Paper>
                    </Grid>
                    <Grid className={classes.grDataTable} item xs={12} sm={5} >
                        <Paper className={classes.paper2}>
                            <DataTable />
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}
export default MainAdmin
