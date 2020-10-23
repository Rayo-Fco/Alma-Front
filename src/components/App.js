import {
  Switch,
  Route
} from "wouter";
import Footer from './Footer';
import Main from './Main';
import React, { Suspense } from "react";
import '../css/App.css';
import LoginForm from './LoginForm';
import MainAdmin from './MainAdmin'
import MapView from './MapView'
import Grafico1 from './UserResult'
import Grafico2 from './ButtonResult'
import Grafico3 from './CommuneResult'
import ListCommunes from './ListCommunes'
import AddMarker from './AddMarker'
import NavBar from './NavBar'
import About from './About'
import InfoComunas from './InfoComuna';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from '../context/UserContext';

function App() {
  return (
    <>
      <UserContextProvider>
        <div className="App" style={{ backgroundColor: "white" }}>
          <Suspense fallback={null}>
          <NavBar />
            <Switch>
              <Route component={Main} exact path="/">
              </Route>
              <Route component={LoginForm} exact path="/login">
              </Route>
              <Route component={MapView} exact path="/map">
              </Route>
              <Route component={Grafico1} exact path="/grafico1">
              </Route>
              <Route component={Grafico2} exact path="/grafico2">
              </Route>
              <Route component={Grafico3} exact path="/grafico3">
              </Route>
              <Route component={ListCommunes} exact path="/comunas">
              </Route>
              <Route component={MainAdmin} exact path="/principal">
              </Route>
              <Route component={AddMarker} exact path="/add">
              </Route>
              <Route component={About} exact path="/about">
              </Route>
              <Route component={InfoComunas} exact path="/info">
              </Route>
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </UserContextProvider>
    </>
  );
}

export default App;
