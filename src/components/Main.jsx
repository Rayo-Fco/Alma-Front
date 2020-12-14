import React from 'react'
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import smartphone1 from '../img/iphone_alma.png'
import { Grid, makeStyles } from '@material-ui/core'
import AppStore from '../img/AppStore.png'
import GooglePlay from '../img/GooglePlay.png'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        margin: 'auto',
    },
    gr: {
        paddingTop: '35px',
        paddingBottom: '35px'

    },
    smartphoneimage: {
        margin: 'auto'
    },
    featureText: {
        margin: 'auto',
        paddingTop: '80px',
        marginBottom: '80px'


    },
    featureLead: {
        maxwidth: '400px',
        fontsize: '25px',
        lineheight: '35px',
        fontweight: '200',
        textalign: 'initial',
        color: 'black'
    }

}))


export default function Main() {
    window.scrollTo(0, 0)
    const classes = useStyles()
    return (
        <Grid container>
            <Grid item xs={12} sm={6} className={classes.gr}>
                <div className={classes.featureText}>
                    <h2 className='feature-heading'>Sientete más segura con esta APP</h2>
                    <div className='feature-lead'>¿Con desconfianza o miedo en salir a la calle? Usa esta aplicacion movil para poder ver las comisarias cercanas a ti o mandar una alerta a tus contactos en el caso de que te sientas en peligro.</div>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} className={classes.gr}>
                <div className={classes.smartphoneimage}>
                    <img src={smartphone1} alt='' className='feature-image' />
                </div>
            </Grid>
            <Grid item xs={12} style={{ backgroundColor: '#f8f7f4' }}>
                <div style={{ margin: 'auto', padding: '10', height: '56px' }}>
                    <h2 className='encuentranos' style={{ color: 'black' }}> Encuentranos en:</h2>
                </div>
            </Grid>
            <Grid item xs={12} sm={6} style={{ backgroundColor: '#f8f7f4' }}>
                <div className='lii1'><a href='#!'><img style={{ height: '48px' }} src={GooglePlay} alt='googleplay' /></a></div>
            </Grid>

            <Grid item xs={12} sm={6} style={{ backgroundColor: '#f8f7f4' }} >
                <div className='lii2' > <a href='#!' ><img style={{ height: '48px' }} src={AppStore} alt='appstore' /></a></div>
            </Grid>
        </Grid>

    )
}
