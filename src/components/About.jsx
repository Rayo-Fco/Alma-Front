import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Container, Grid, Typography, GridList } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100vh',
        width: '99%',
        display: 'grid',
        paddingTop: theme.spacing(10),
    },
    containerFeature: {
        marginBottom: theme.spacing(15)
    },
    gridAbout: {
        paddingTop: 30,
        margin: 'auto'
    },
    typo: {
        marginTop: 20,
        textAlign: 'justify',
    },
    paperAbout: {
        padding: 30,
        marginTop: 20,
        marginBottom: 40,
        backgroundColor: '#fdcff7'
    },
    gridContainer:{
        backgroundColor:'#f0f0f0'
    }

}));

export default function About() {
    const classes = useStyles();

    return (
        <Grid container className={classes.gridContainer}>
            <Grid className={classes.gridAbout} item xs={8}>
                <Paper className={classes.paperAbout}>
                    <h2 className="feature-heading resaltado-violet-mach">¿Quiénes somos?</h2>
                    <Typography className={classes.typo} variant="body1">
                        Somos Alma y queremos ser en una aplicacion para informar todo tu recorrido y a tus seres queridos. Para hacer posible esto combinamos la tecnología y el diseño centrado en las personas.
                    </Typography>
                </Paper>
                <Paper className={classes.paperAbout}>
                    <h2 className="feature-heading resaltado-violet-mach">¿Que nos motivo?</h2>
                    <Typography className={classes.typo}>
                        En varios medios de comunicaciones últimamente han salido hablando sobre el problema que tienen y han tenido las mujeres a lo largo de nuestra historia. Unos de sus problemas es que cuando salen a las calles con poca iluminación o pocas personas circulando por su ruta, se sienten muy inseguras, más aún cuando ellas están solas. De hecho, se ha dado una cifra de cuantas mujeres han sido acosadas por las calles, en el año 2017 por la corporación humana lo que les dio un resultado de un 89,9%, producto de esto las mujeres se han sentido muy inseguras en las calles de la ciudad, haciendo que ellas modifiquen las rutas en las que normalmente transitan y eviten caminar solas por las noches, lo cual esto ha restringido a niveles demasiado altos la libertad de las mujeres.
                    </Typography>
                </Paper>
                <Paper className={classes.paperAbout}>

                    <h2 className="feature-heading resaltado-violet-mach">Manifiesto</h2>
                    <Typography className={classes.typo}>
                        En Alma utilizamos el poder de la tecnologia como principal motor de las soluciones que hacen más fácil la vida de las personas. Trabajamos día a día para que todos tengan la posibilidad de acceder a la informacion del destino de algun ser querido para poder estar seguros.
                </Typography>
                </Paper>
                <Paper className={classes.paperAbout}>

                    <h2 className="feature-heading resaltado-violet-mach">Mision</h2>
                    <Typography className={classes.typo}>
                        Brindar soluciones tecnológicas aplicando las últimas tecnologías del mercado, manteniendo la calidad en el desarrollo tecnológico, Además de innovar sobre los requerimientos nuevos requerimiento que puedan tener los usuarios del sistema.
                </Typography>
                </Paper>
                <Paper className={classes.paperAbout}>

                    <h2 className="feature-heading resaltado-violet-mach">Vision</h2>
                    <Typography className={classes.typo}>
                        Nuestro enfoque es ser una empresa ser reconocida por las mujeres como una aplicación de ayuda y crear una comunidad para que las mujeres se sientan acompañadas por ellas mismas en su día a día.
                </Typography>
                </Paper>

            </Grid>
        </Grid>


    )
}
