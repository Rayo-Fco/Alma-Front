import React from 'react';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppStore from '../img/AppStore.png'
import GooglePlay from '../img/GooglePlay.png'
import Features from './Features'
import { isFirefox } from 'react-device-detect'
console.log(isFirefox)

function Main() {
    return (
        <div style={{ height: "auto"}}>
            <Features>

            </Features>
            <div className="container-fluid" style={{ height: "176px",padding:"20px" ,backgroundColor: "#f8f7f4"  }}>

                <div style={{ margin: "auto", padding: "10", height: "56px" }}>
                    <h2 className="encuentranos" style={{ color: "black" }}> Encuentranos en:</h2>
                </div>

                <div className="container-sm" style={{ height: "48px", color: "black", width: "400px" }}>
                    <a href="#!" ><div className="lii"><img style={{ height: "48px", marginLeft: "20px" }} src={AppStore} alt="appstore"/></div></a>
                    <a href="#!"><div className="lii"><img style={{ height: "48px", marginLeft: "30px" }} src={GooglePlay} alt="googleplay"/></div></a>
                </div>
            </div>
        </div>
    );
}
export default Main;