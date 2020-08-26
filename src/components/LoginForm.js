import React, { Component } from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../img/LogoAlma.png';

class LoginForm extends Component {
    render() {
        return (
            <div className="container">
                <div className="container-sm " style={{ width: "500px", marginTop: "150px" }}>
                    <form>
                        <img src={logo} style={{width: "300px"}} />

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

                        <button type="submit" className="btn btn-primary btn-block" style={{backgroundColor: "#fd9eef", borderColor: "white"}}>Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                    </form>
                </div >
            </div>
        );


    }
}
export default LoginForm;