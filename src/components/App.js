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
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <div className="App" style={{backgroundColor: "#fd9eef" ,color: "white"}}>
        <Suspense fallback={null}>
          <Navigation>
          </Navigation>
          <LoginForm></LoginForm>
          <div className="container" style={{marginBottom:"150px"}}>

          </div>
          <Footer />
        </Suspense>
         {/* 
         <Switch>
            <Route component={Main} exact path="/">
            </Route>
          </Switch>
           */} 
      </div>
    </>
  );
}

export default App;
