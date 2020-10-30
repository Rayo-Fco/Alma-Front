import React, { useEffect } from 'react'
import { Paper, Container, Grid, Typography, GridList } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar';
import { deepOrange } from '@material-ui/core/colors';
import UserGraph from './UserGraph';
import ListCommunes from './ListCommunes';
import ListCheckIns from './ListCheckIns'
import { useLocation } from 'wouter';

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
    paper2: {
        color: theme.palette.text.secondary,
        height: 'auto',
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
    }
}))


export default function PrincipalAdmin() {
    const [, navigate] = useLocation()

    useEffect(() => {
        const ac = new AbortController();
        if (!sessionStorage.getItem('tokenadmin')) {
            navigate('/')

        }
        return () => ac.abort();
    }, [navigate])

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
                                {localStorage.getItem('email')}
                            </Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                            <UserGraph />
                        </Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper2}>
                            <GridList className={classes.gr}>
                                <ListCheckIns />
                            </GridList>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper className={classes.paper2}>
                            <GridList cellHeight={130} className={classes.gridList} cols={3}>
                                <ListCommunes />
                            </GridList>
                        </Paper>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    )
}