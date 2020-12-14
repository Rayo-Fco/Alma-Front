import React, { Component } from 'react'
import '../css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Link } from 'wouter'

class Footer extends Component {
    render() {
        return (
            <div className='footer-basic'>
                <footer className='page-footer font-small indigo'>
                    <div className='container text-center text-md-left'>
                        <div className='row'>
                            <hr className='clearfix w-100 d-md-none' />
                            <div className='col-md-3 mx-auto'>
                                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>EMPRESA</h5>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link to='/sobre-nosotros' className='link'>Sobre ALMA</Link>
                                    </li>
                                </ul>
                            </div>
                            <hr className='clearfix w-100 d-md-none' />
                            <div className='col-md-3 mx-auto'>
                                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>DESCARGAR</h5>
                                <ul className='list-unstyled'>
                                    <li>
                                        <a href='#!'>Android</a>
                                    </li>
                                    <li>
                                        <a href='#!'>iPhone</a>
                                    </li>
                                </ul>
                            </div>
                            <hr className='clearfix w-100 d-md-none' />
                            <div className='col-md-3 mx-auto'>
                                <h5 className='font-weight-bold text-uppercase mt-3 mb-4'>RECURSOS</h5>
                                <ul className='list-unstyled'>
                                    <li>
                                        <Link to='#!' className='link'>Preguntas frecuentes</Link>
                                    </li>
                                    <li>
                                        <a href='#!'>Instagram</a>
                                    </li>
                                    <li>
                                        <a href='#!'>Facebook</a>
                                    </li>
                                    <li>
                                        <a href='#!'>Twitter</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='footer-copyright text-center py-3' id='derechos'>© 2020 Copyright:
                        <a href='#!'>Alma</a>
                    </div>
                </footer>
            </div>
        )


    }
}
export default Footer