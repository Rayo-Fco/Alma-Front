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
    input: {
        width: '50%'
    },
    button: {
        width: '20%',
        height: 55,
        marginLeft: '2%',
        fontSize: 20
    },
    typho: {
        fontSize: 20,
    },
    b: {
        fontSize: 20
    },
    container: {
        paddingBottom: theme.spacing(3),
    },
    cnt: {
        minHeight: 650
    },
    acordionCollapse: {
        height: 'auto'
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


    function splitfecha(fecha) {
        fecha.split("T")
        return fecha[0]
    }


    return (
        <Container fixed className={classes.cnt}>
            <Paper className={classes.cnt} elevation={3} style={{ cursor: 'pointer' }}>
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
                    <Container fixed className={classes.container}>
                        <Accordion defaultActiveKey="0">
                            {
                                checkins.User.map((checkin, index) => (
                                    <Paper key={index}>
                                        <Accordion.Toggle as={Card.Header} eventKey={index + 1} style={{ display: 'flex' }}>
                                            <Grid item xs={6} >
                                                <Typography className={classes.typho}>
                                                    <b className={classes.b}>Usuario: </b>{checkin.user[0].email}
                                                    {console.log(checkin)}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={6}>
                                                <Typography className={classes.typho}>
                                                    <b>Rut: </b>{checkin.user[0].rut}
                                                </Typography>
                                            </Grid>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse className={classes.acordionCollapse} eventKey={index + 1}>
                                            <Card >
                                                <Grid xs={6}>

                                                    <Grid item xs zeroMinWidth>
                                                        <Typography noWrap><b className={classes.b}>Comuna: </b>{checkin.comuna}</Typography>

                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        {
                                                            checkin.info[0].numero_depto
                                                                ?
                                                                <Typography noWrap><b className={classes.b}>Numero departamento: </b>{checkin.info[0].numero_depto}</Typography>

                                                                :
                                                                <></>
                                                        }
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        {
                                                            checkin.info[0].numero_piso
                                                                ?
                                                                <Typography noWrap><b className={classes.b}>Numero de Piso: </b>{checkin.info[0].numero_piso}</Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        {
                                                            checkin.info[0].extra
                                                                ?
                                                                <Typography noWrap><b className={classes.b}>Extra: </b>{checkin.info[0].extra}</Typography>
                                                                :
                                                                <></>
                                                        }
                                                    </Grid>
                                                    <Grid item xs zeroMinWidth>
                                                        <Typography noWrap><b className={classes.b}>Fecha: </b>{checkin.date.split("T")}</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Card>
                                        </Accordion.Collapse>
                                    </Paper>
                                ))
                            }
                        </Accordion>
                    </Container>
                </Grid>
            </Paper>
        </Container>
    );
}

export default ListCheckIns;