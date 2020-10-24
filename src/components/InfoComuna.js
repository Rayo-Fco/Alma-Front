import React from 'react';
import MapViewData from './MapViewData'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Grid, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
    },
    gr: {
        marginTop: theme.spacing(3),

    },
    paper: {
        height: '92%',
        backgroundColor: '#e0dfdf',
        marginRight: '15px'

    },
    dtpick: {
        marginLeft: 60,
    },
    btn: {
        marginTop: 15,
        marginLeft: 20,
    },
    pap: {
        marginTop: theme.spacing(2),
        height: 800,
        width: 'auto'

    },
    grpap: {
        margin: 'auto',
    },
    button: {
        margin: theme.spacing(1),
        marginBottom: theme.spacing(2),

    },
    input: {
        marginBottom: theme.spacing(2),
    },
    gridform: {
        margin: 'auto',
        height: '100%',


    },
    paperform: {
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80',
        width: '200px'
    },
    container: {
        marginTop: 200,
        width: 'auto'
    },
    row: {
        height: 70
    }
}));

function createData(name, info) {
    return { name, info };
}

const rows = [
    createData('Botones apretados', 159),
    createData('Cantidad de alertas', 237),
    createData('Cantidad de comisarias', 262),
    createData('Patrullaje', 305),
    createData('Gingerbread', 356),
];

function InfoComuna() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={8}>
                    <MapViewData></MapViewData>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper} elevation={15}>
                        <Grid container className={classes.gr} alignItems="flex-end">
                            <Grid item className={classes.gridform} >
                                <Paper className={classes.pap} elevation={15}>
                                    <TableContainer className={classes.container} component={Paper}>
                                        <Table className={classes.table} aria-label="simple table">
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell align="center"><b>Titulo</b></TableCell>
                                                    <TableCell align="center"><b>Informacion</b></TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((row) => (
                                                    <TableRow className={classes.row} key={row.name}>
                                                        <TableCell component="th" scope="row">
                                                            {row.name}
                                                        </TableCell>
                                                        <TableCell align="center"><b style={{color: 'red'}}>{row.info}</b></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

export default InfoComuna;