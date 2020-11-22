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
    container: {
        height: theme.spacing(51),
        marginTop: theme.spacing(10),
        marginBottom: theme.spacing(8),
        width: 'auto'
    },
    map: {
        width: 'auto'
    },
    row: {
        height: 70
    },
    gridform: {
        margin: 'auto',
        height: '100%',
        width: '80%',
        maxWidth: 500,
        marginBottom: 30
    },
    paperform: {
        padding: '15px',
        marginTop: theme.spacing(3),
        height: '80'
    },
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
            <Grid container>
            <Grid item xs={12} sm={7}>
                    <MapViewData></MapViewData>
                </Grid>
                <Grid item xs={8} sm={5} id="tableform">
                <Grid item className={classes.gridform}  >
                        <Paper className={classes.paperform} elevation={15}>
                           
                                <TableContainer>
                                    <Table className={classes.table} style={{ backgroundColor: '#fafafa' }} aria-label="simple table">
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
                                                    <TableCell align="center"><b style={{ color: 'red' }}>{row.info}</b></TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                    </Grid>

                </Grid>
            </Grid>
        </div>
    );
}

export default InfoComuna;