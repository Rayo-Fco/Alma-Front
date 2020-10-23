import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, IconButton } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        paddingTop: 10,
        height: 90,
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    grd: {
        margin: 'auto'
    },
    dtpick: {
        marginLeft: 60,
    },
    btn: {
        marginTop: 15,
        marginLeft: 20,
    },
    content: {
        display: 'flex',
        width: 'auto',
        margin:'auto'
    }
}));




function SeleccionFecha(props) {

    const classes = useStyles();

    const [selectedDate, setSelectedDate] = React.useState(new Date('2020-09-27T21:11:54'));
    const HandleDateChange = (date) => {
        setSelectedDate(date);
        //aqui se recibe la fecha
        console.log(date);
    };


    return (
        <div className={classes.root} >
             <Paper >
                    <Grid container className={classes.gr} style={{margin:'auto'}} alignItems="flex-end">
                        <div className={classes.content}>
                        <MuiPickersUtilsProvider  utils={DateFnsUtils}>
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
                        </div>
                       
                 
                    </Grid>
                </Paper>

        </div>
    );
}

export default SeleccionFecha;