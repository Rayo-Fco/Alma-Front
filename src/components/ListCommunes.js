import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Container, Paper } from '@material-ui/core'
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
        padding: theme.spacing(1),
        marginTop: theme.spacing(3),
    }
}));


function ListComunas({ sendCommunes }) {
    const classes = useStyles();
    const handleMap = (comunas) => {
        sendCommunes(comunas)
    }
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
                                <Link to='/info' className="link" key={comuna.id} onClick={() => handleMap(comuna.name)}>
                                    <ListItem button >
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <RoomIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText style={{ width: '250px' }} primary={`${comuna.name}`} />
                                            <ListItemText style={{ color: 'red' }} primary={`${comuna.id}`} />
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

export default connect(null, { sendCommunes })(ListComunas)