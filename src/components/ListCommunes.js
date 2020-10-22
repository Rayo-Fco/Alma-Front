import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Container, Paper } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { updateOpen } from '../actions/openDrawerAction'
import { Link } from 'wouter'
import { connect } from "react-redux"
import { comunas } from '../assets/comunas.json';

const useStyles = makeStyles((theme) => ({
    title: {
        margin: theme.spacing(4, 0, 2),
        fontFamily: 'helvetica',
        fontSize: 36,

    },
    container: {
        margin: 'auto',
        marginBottom: theme.spacing(2),
    },
    paper2: {
        padding: theme.spacing(1),
        marginTop: theme.spacing(3)
    }
}));


function ListComunas(props, { updateOpen }) {
    const classes = useStyles();

    return (

        <Container fixed>

            <Grid className={classes.container} item xs={12} md={6}>
                <Paper elevation={3} className={classes.paper2}>
                    <p className={classes.title}>
                        Comunas
                    </p>
                    <List>
                        {
                            comunas.map(comuna => (
                                <Link to='/map' className="link">
                                    <ListItem button >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <RoomIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText style={{width: '250px'}} primary={`${comuna.name}`} />
                                            <ListItemText style={{color: 'red'}} primary={`${comuna.id}`} />
                                        </ListItem>
                                        <IconButton edge="end" aria-label="delete">
                                            <PlayCircleOutlineIcon />
                                        </IconButton>
                                    </ListItem>
                                </Link>
                            ))
                        }
                    </List>
                </Paper>
            </Grid>
        </Container>

    );
}

export default connect(null, { updateOpen })(ListComunas)