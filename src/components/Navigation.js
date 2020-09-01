import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'wouter';
import logo from '../img/A.png';

export default function Navigation() {

    return (
        <ReactBootStrap.Navbar collapseOnSelect style={{background: "#fd9eef"}} expand="lg" className="br-dark dark">
            <Link to='/' className="navbar-brand">
                <a><img src={logo} style={{width: "90px",height:"70px"}} /></a>
            </Link>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </ReactBootStrap.Navbar >
    );

}
