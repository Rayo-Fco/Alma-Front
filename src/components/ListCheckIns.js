import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Paper, Typography, TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios'
import { Accordion, Card } from 'react-bootstrap';


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
    const [checkins, setCheckins] = useState({ User: [] })

    useEffect(() => {
        let isMounted = true
        const token = window.sessionStorage.getItem('tokenadmin')
        axios.get('http://localhost:3001/checkin/all2', {
            headers: { Authorization: "Bearer " + token }
        })
            .then(res => {
                if (isMounted) {
                    setCheckins({ User: res.data })
                    console.log(res.data[0].user[0].rut)
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
    }, [setCheckins])

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
                    <Accordion defaultActiveKey="0">
                            {
                                checkins.User.map((checkin, index) => (
                                    <Paper elevation={15} key={index}>
                                        <Accordion.Toggle as={Card.Header} eventKey={index}>
                                            <Grid item xs={6}>
                                                {checkin.user[0].rut}
                                            </Grid>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={index}>
                                            <Card.Body>Hello! I'm the body

                                            {checkin.user.rut}
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Paper>
                                ))
                            }
                        </Accordion>
                    </Grid>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ListCheckIns;