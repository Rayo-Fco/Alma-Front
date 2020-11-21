import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Container, Paper, Typography } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Link } from 'wouter'
import { connect } from "react-redux"
import { comunas } from '../assets/comunas.json';
import { sendCommunes } from '../actions/communesAction'

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(4, 0, 2),
        fontFamily: 'helvetica',
        fontSize: 36,
    },
    container: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
        width: '500px'
    },
    paper2: {
        marginTop: theme.spacing(3),
        maxWidth: 550,
        minWidth: 290,
        margin: 'auto'
    },
    typ: {
        margin: 'auto',
        paddingTop: 25,
        fontSize: 40
    },
}));


function ListComunas({ sendCommunes }) {
    const classes = useStyles();
    const handleMap = (comunas) => {
        sendCommunes(comunas)
    }
    return (

        <Container fixed>

            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper2}>
                        <Typography className={classes.typ} color="primary">
                            Comunas
                    </Typography>
                        <List>
                            {
                                comunas.map(comuna => (
                                    <Link to='/info' className="link" key={comuna.id} onClick={() => handleMap(comuna.name)}>
                                        <ListItem button >
                                            <ListItem>
                                                <Grid item xs={3}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <RoomIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                </Grid>
                                                <Grid  item xs={3}>
                                                    <ListItemText primary={`${comuna.name}`} />
                                                </Grid>

                                            </ListItem>
                                            <Grid  item xs={3}>
                                                <IconButton edge="end" aria-label="delete">
                                                    <PlayCircleOutlineIcon />
                                                </IconButton>
                                            </Grid>
                                        </ListItem>
                                    </Link>
                                ))
                            }
                        </List>
                    </Paper>
                </Grid>
            </Grid>
        </Container>

    );
}

export default connect(null, { sendCommunes })(ListComunas)