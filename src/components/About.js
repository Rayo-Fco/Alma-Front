import React from 'react'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        height: '100%',
        width: '99%',
        display: 'grid',
        paddingBottom: theme.spacing(10),
        paddingTop: theme.spacing(4),
    },
    containerFeature: {
        marginBottom: theme.spacing(20)
    }


}));

export default function About() {
    const classes = useStyles();

    return (
        <div className={classes.container}>
            <div className="container-20px-margin w-container">
                <div className={classes.containerFeature}>
                    <div className="text-columns w-row">
                        <div className="column-text align-top w-col w-col-6">
                            <h2 className="feature-heading resaltado-violet-mach">¿Quiénes somos?</h2>
                            <div className="feature-lead">Somos Alma y queremos ser en una aplicacion para informar todo tu recorrido y a tus seres queridos.
                                <br />Para hacer posible esto combinamos la tecnología y el diseño centrado en las personas<br />
                            </div>
                        </div>
                        <div className="column-text align-top w-col w-col-6">
                            <h2 className="feature-heading resaltado-violet-mach">Manifiesto</h2>
                            <div className="feature-lead">En Alma utilizamos el poder de la tecnologia como principal motor de las soluciones que hacen más fácil la vida de las personas. Trabajamos día a día para que todos tengan la posibilidad de acceder a la informacion del destino de algun ser querido para poder estar seguros.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
