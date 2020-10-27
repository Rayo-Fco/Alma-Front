import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, IconButton, TextField, Button } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { usuarios } from '../assets/checkins.json';
import { Link } from 'wouter'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
    typ: {
        margin: 'auto',
        fontSize: 55
    },
    cnt: {
        width: '90%',
        margin: 'auto',
        marginTop: '20px'
    },
    input: {
        width: '50%'
    },
    button: {
        width: '20%',
        height: 55,
        marginLeft: '2%',
        fontSize: 20
    }
}))

function ListCheckIns(props) {
    const classes = useStyles();

    return (
        <Container fixed>
            <Paper className={classes.cnt} elevation={15}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Typography className={classes.typ} color="primary">
                            Check ins
                    </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            className={classes.input}
                            id=""
                            label="Rut"
                            variant="outlined"
                        />
                        <Button
                            className={classes.button}
                            variant="contained"
                            color="primary"
                            startIcon={<SearchIcon />}>
                            Buscar
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <List>
                            {
                                usuarios.map(usuario => (
                                    <Link to='/map' className="link" key={usuario.id}>
                                        <ListItem button >
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <VerifiedUserIcon style={{ color: green[500] }} />
                                                </ListItemAvatar>
                                                <ListItemText style={{ width: '250px',fontSize: '40px' }} primary={`${usuario.name}`} />
                                                <ListItemText style={{ color: 'green' }} primary={`${usuario.date}`} />
                                            </ListItem>
                                            <IconButton edge="end" aria-label="delete">
                                                <PlayCircleOutlineIcon />
                                            </IconButton>
                                        </ListItem>
                                    </Link>

                                ))
                            }
                        </List>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ListCheckIns;