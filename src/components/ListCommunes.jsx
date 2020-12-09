import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, Container, Paper, Typography } from '@material-ui/core'
import RoomIcon from '@material-ui/icons/Room';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import { Link } from 'wouter'
import { connect } from "react-redux"
import { sendCommunes } from '../actions/communesAction'
import axios from 'axios'
import CircularProgress from '@material-ui/core/CircularProgress';
import api from '../services/api'

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
    progress: {
        height: '80%',
        width: '80%',
        paddingTop: '15%',
        paddingBottom: '15%',
        paddingLeft: '15%'

    },
    circular: {
        color: '#fd9eef'
    },
}));


function ListComunas({ sendCommunes }) {
    const classes = useStyles();
    const [isLoading, setIsLoading] = useState(true)
    const [communes, setCommunes] = useState({commune:[]})
    const handleMap = (comunas) => {
        sendCommunes(comunas)
    }


    useEffect(() => {
        window.scrollTo(0,0)
        let isMounted = true
        let source = axios.CancelToken.source();
        const token = window.sessionStorage.getItem('tokenadmin')

        axios.get(`${api}comuna/all`, {
            headers: { Authorization: "Bearer " + token },
            cancelToken: source.token,
        })
            .then(res => {
                if (isMounted) {
                    setCommunes({ commune: res.data })
                    setIsLoading(false)

                }
            }).catch(function (e) {
                if (isMounted) {
                    if (axios.isCancel(e)) {
                    }
                }
            })
        return function () {
            isMounted = false;
        }

    }, [setCommunes]);


    return (
        <>
        {isLoading &&
            <div className={classes.progress}>
                <CircularProgress className={classes.circular} style={{ width: '30%', height: '30%', }} />
            </div>
        }

        {!isLoading &&
        <Container fixed>

            <Grid container>
                <Grid item xs={12}>
                    <Paper elevation={3} className={classes.paper2}>
                        <Typography className={classes.typ} color="primary">
                            Comunas
                    </Typography>
                        <List>
                            {
                                communes.commune.map(commune => (
                                    <Link to='/info' className="link" key={commune._id} onClick={() => handleMap(commune.comuna)}>
                                        <ListItem button >
                                            <ListItem>
                                                <Grid item xs={3}>
                                                    <ListItemAvatar>
                                                        <Avatar>
                                                            <RoomIcon />
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                </Grid>
                                                <Grid item xs={3}>
                                                    <ListItemText primary={`${commune.comuna}`} />
                                                </Grid>

                                            </ListItem>
                                            <Grid item xs={3}>
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
                        }
</>
    );
}

export default connect(null, { sendCommunes })(ListComunas)