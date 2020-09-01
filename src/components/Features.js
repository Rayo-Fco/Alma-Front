import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import smartphone1 from '../img/iphone_alma.png'

export default function Navigation() {

    return (
        <div className="cont-features">
            <div className="w-container">
                <div className="feature-wrapper">
                    <div className="feature-columns w-row">
                        <div className="column-text w-col w-col-6">
                            <h2 className="feature-heading">Sientete con más segura</h2>
                            <div className="feature-lead">¿Con desconfianza o miedo en salir a la calle? Usa esta aplicacion movil para poder ver las comisarias cercanas a ti o mandar una alerta a tus contactos en el caso de que te sientas en peligro.</div>
                        </div>
                        <div className="column-image w-col w-col-6">
                            <img src={smartphone1} alt="" className="feature-image" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}