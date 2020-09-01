import React, { useState } from 'react';
import { useEffect } from "react";
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/LogoAlma.png';
import useLogin from '../hooks/useLogin';
import { useLocation, Link } from 'wouter';
import '../css/login.css'

export default function LoginForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [, navigate] = useLocation()
    const { login, isLogged, hasLoginError } = useLogin()
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        login({ email, password })
    };

    useEffect(() => {
        if (isLogged){
            navigate('/principal')
        } 
    }, [isLogged, navigate])


        return (
            <div>
                <div className="container-sm" style={{ width: "500px", marginTop: "35px", marginBottom: "35px", backgroundColor:"#fd9eef", padding:"40px", borderRadius:"15px" }}>
                    <form onSubmit={handleSubmit}>
                        <img src={logo} style={{ width: "250px", marginBottom:"30px"}} />
                        <h3 class="titulo">Iniciar sesión</h3>
                        {hasLoginError &&
                                            <div className="alert alert-danger alert-styled-left">
                                                Correo o contraseña inválidos
                                    </div>
                                        }
                        <div class="input">
								<span class="fa fa-envelope-o" aria-hidden="true"></span>
								<input type="email" placeholder="Correo electrónico" onChange={(e) => setEmail(e.target.value)} value={email} name="email" required />
							</div>
							<div class="input">
								<span class="fa fa-key" aria-hidden="true"></span>
								<input type="password" placeholder="Contraseña" onChange={(e) => setPassword(e.target.value)} value={password} name="password" required />
							</div>
							<button type="submit" class="btn submit">Iniciar sesión</button>
                        

                            <a href="#" class="forgot">¿Olvidaste la contraseña?</a>

                    </form>
                </div >

            </div>
        );
}
