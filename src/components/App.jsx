import React, { Suspense, useEffect } from 'react'
import {
  Switch,
  Route
} from 'wouter'
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
import CircularProgress from '@material-ui/core/CircularProgress'
import ResetPassword from './ResetPassword'
import Nothing from './Nothing'
import { connect } from 'react-redux'
import { selectActiveAuth } from '../reducers/authReducer'
import { sendAuth } from '../actions/authAction'

const mapStateToProps = state => {
  return {
    auth: selectActiveAuth(state),
  }
}

function App({ auth, sendAuth }) {

  useEffect(() => {
    if (sessionStorage.getItem('tokenadmin')) {
      sendAuth(true)
    }
    return () => {

    }
  }, [auth, sendAuth])

  return (
    <>
      <UserContextProvider>
        <div className='App' style={{ backgroundColor: 'white' }}>
          <Suspense fallback={<CircularProgress />}>
            <NavBar />
            <Switch>
              <Switch>
                <Route component={Main} exact path='/' />
                <Route component={LoginForm} exact path='/iniciar-sesion' />
                <Route component={NeedHelp} exact path='/needhelp' />
                <Route component={MapViewHelp} exact path='/needhelp/:helpToken' />
                <Route component={ResetPassword} exact path='/login/reset_password' />
                <Route component={About} exact path='/sobre-nosotros' />
                {
                  auth &&
                  <Switch>
                    <Route component={MapView} exact path='/mapa' />
                    <Route component={ListCommunes} exact path='/comunas' />
                    <Route component={MainAdmin} exact path='/principal' />
                    <Route component={AddMarker} exact path='/agregar-marcador' />
                    <Route component={MapViewData} exact path='/info' />
                    <Route component={RegisterAdmin} exact path='/registrar-administrador' />
                    <Route component={RegistroComuna} exact path='/registrar-comuna' />
                    <Route component={ViewAlert} exact path='/ver-alertas' />
                    <Route component={ListCheckIns} exact path='/ver-checkins' />
                    <Route component={MapViewHelpAll} exact path='/needhelpall/:helpRut/:helpalert' />
                    <Route component={Nothing} />
                  </Switch>
                }
                <Route component={Nothing} />
              </Switch>
            </Switch>
            <Footer />
          </Suspense>
        </div>
      </UserContextProvider>
    </>
  )
}

export default connect(mapStateToProps, { sendAuth })(App)
