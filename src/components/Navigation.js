import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as ReactBootStrap from 'react-bootstrap';
import { Link } from 'wouter';

export default function Navigation() {

    return (
        <ReactBootStrap.Navbar collapseOnSelect style={{background: "#fd9eef"}} expand="lg" className="br-dark dark">
            <Link to='/' className="navbar-brand">
                Alma
            </Link>
            <ReactBootStrap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
        </ReactBootStrap.Navbar >
    );

}
