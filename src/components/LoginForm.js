import React, { Component } from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/LogoAlma.png';
import AppStore from '../img/AppStore.png'
import GooglePlay from '../img/GooglePlay.png'

class LoginForm extends Component {
    render() {
        return (
            <div>
                <div className="container-sm " style={{ width: "500px", marginTop: "100px" }}>
                    <form>
                        <img src={logo} style={{ width: "300px" }} />

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control" placeholder="Enter email" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input type="checkbox" className="custom-control-input" id="customCheck1" />
                                <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: "#fd9eef", borderColor: "white" }}>Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div >
                <div className="container-fluid" style={{ height: "406px", backgroundColor: "#f8f7f4" }}>
                    <div style={{ margin: "auto", padding: "100px", height: "206px" }}>
                        <h2 className="encuentranos" style={{ color: "black" }}> Encuentranos en:</h2>
                    </div>
                    <div className="container-sm" style={{ height: "48px", color: "black", width: "400px" }}>
                    <a><div className="lii"><img style={{ height: "48px", marginLeft: "20px" }} src={AppStore}></img></div></a>
                    <a><div className="lii"><img style={{ height: "48px", marginLeft: "30px" }} src={GooglePlay}></img></div></a>
                    </div>
                </div>

            </div>
        );


    }
}
export default LoginForm;