import React from 'react';
import MapViewData from './MapViewData'
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
    },
    
}));

function InfoCheckIn(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>

            <MapViewData></MapViewData>

        </div>
    );
}

export default InfoCheckIn;