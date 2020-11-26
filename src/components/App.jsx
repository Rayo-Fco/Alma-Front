import React, { Suspense } from "react"
import {
  Switch,
  Route
} from "wouter"
import Footer from './Footer'
import Main from './Main'
import '../css/App.css'
import LoginForm from './LoginForm'
import MainAdmin from './MainAdmin'
import MapView from './MapView'
import ListCommunes from './ListCommunes'
import AddMarker from './AddMarker'
import NavBar from './NavBar'
import About from './About'
import MapViewData from './MapViewData'
import RegisterAdmin from './RegisterAdmin'
import RegistroComuna from './AddCommune'
import ViewAlert from './ViewAlert'
import ListCheckIns from './ListCheckIns'
import NeedHelp from './NeedHelp'
import MapViewHelp from './MapViewHelp'
import MapViewHelpAll from './MapViewHelpAll'

import 'bootstrap/dist/css/bootstrap.min.css'
import { UserContextProvider } from '../context/UserContext'
import DataTable from './DataTable'
import CircularProgress from '@material-ui/core/CircularProgress'

function App() {
  return (
    <>
      <UserContextProvider>
        <div className="App" style={{ backgroundColor: "white" }}>
          <Suspense fallback={<CircularProgress/>}>
          <NavBar />
            <Switch>
              <Route component={Main} exact path="/">
              </Route>
              <Route component={LoginForm} exact path="/login">
              </Route>
              <Route component={MapView} exact path="/map">
              </Route>
              <Route component={ListCommunes} exact path="/comunas">
              </Route>
              <Route component={MainAdmin} exact path="/principal">
              </Route>
              <Route component={AddMarker} exact path="/add">
              </Route>
              <Route component={About} exact path="/about">
              </Route>
              <Route component={MapViewData} exact path="/info">
              </Route>
              <Route component={RegisterAdmin} exact path="/regAdmin">
              </Route>
              <Route component={RegistroComuna} exact path="/regComuna">
              </Route>
              <Route component={ViewAlert} exact path="/alert">
              </Route>
              <Route component={ListCheckIns} exact path="/checkins">
              </Route>
              <Route component={NeedHelp} exact path="/needhelp">
              </Route>
              <Route component={MapViewHelp} exact path="/needhelp/:helpToken">
              </Route>
              <Route component={DataTable} exact path="/data">
              </Route>
              <Route component={MapViewHelpAll} exact path="/needhelpall/:helpRut/:helpalert">
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
