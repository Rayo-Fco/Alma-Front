import {
  Switch,
  Route
} from "wouter";
import Footer from './Footer';
import Main from './Main';
import React, { Suspense } from "react";
import '../css/App.css';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="App">
        <Suspense fallback={null}>
          <Navigation>
          </Navigation>
          <Switch>
            <Route component={Main} exact path="/">
            </Route>
          </Switch>
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App;
