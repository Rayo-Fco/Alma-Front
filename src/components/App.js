import {
  Switch,
  Route
} from "wouter";
import Footer from './Footer';
import Main from './Main';
import React, { Suspense } from "react";
import '../css/App.css';
import Navigation from './Navigation';
import LoginForm from './LoginForm';
import PrincipalAdmin from './PrincipalAdmin'
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContextProvider } from '../context/UserContext';

function App() {
  return (
    <>
      <UserContextProvider>
        <div className="App" style={{ backgroundColor: "white" }}>
          <Suspense fallback={null}>
            <Navigation>
            </Navigation>
            <Switch>
              <Route component={Main} exact path="/">
              </Route>
              <Route component={LoginForm} exact path="/login">
              </Route>
              <Route component={PrincipalAdmin} exact path="/login">
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
