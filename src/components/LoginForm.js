import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/LogoAlma.png';
import AppStore from '../img/AppStore.png'
import GooglePlay from '../img/GooglePlay.png'

export default function LoginForm() {
        return (
            <div>
                <div className="container-sm" style={{ width: "500px", marginTop: "100px", marginBottom: "100px", backgroundColor:"#fd9eef", padding:"40px", borderRadius:"50px" }}>
                    <form>
                        <img src={logo} style={{ width: "300px" }} />

                        <div className="form-group">
                            <label>Correo electronico</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Contraseña</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Rercordar</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-light btn-block" style={{ backgroundColor: "white", borderColor: "white" }}>Iniciar sesion</button>
                        <p className="forgot-password text-right">
                            ¿Olvidaste tu contraseña? <a href="#">Recuperar clave</a>
                        </p>
                    </form>
                </div >

            </div>
        );
}
