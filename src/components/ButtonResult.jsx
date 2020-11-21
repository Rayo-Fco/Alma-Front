import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import DateFnsUtils from '@date-io/date-fns';
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import GraficoBotones from './ButtonGraph';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
        height: 'auto'
    },
    gr: {
        marginTop: theme.spacing(4),

    },
    paper: {
        maxWidth: 1000,
        height: 'auto',

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
    },
    grpap: {
        margin: 'auto',
    }
}));



export default function CantUsuarios() {
    const classes = useStyles();
    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-09-27T21:11:54'));
    const HandleDateChange = (date) => {
        setSelectedDate(date);
        //aqui se recibe la fecha
        console.log(date);
    };

    return (
        <div>

            <Container className={classes.root} maxWidth="xl">
                <Paper>
                    <Grid container className={classes.gr} alignItems="flex-end">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <Grid item>
                                <KeyboardDatePicker className={classes.dtpick}
                                    margin="normal"
                                    label="De:"
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={HandleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <KeyboardDatePicker className={classes.dtpick}
                                    margin="normal"
                                    label="Hasta:"
                                    format="dd/MM/yyyy"
                                    value={selectedDate}
                                    onChange={HandleDateChange}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                />
                            </Grid>
                        </MuiPickersUtilsProvider>
                        <Grid item>
                            <IconButton className={classes.btn} aria-label="Filtrar">
                                <SearchIcon fontSize="large" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </Paper>
                <Paper className={classes.pap}>
                    <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
                        <GraficoBotones/>
                    </Grid>
                </Paper>

            </Container>
        </div>
    );
}