import React, { Component } from 'react';
import { HashRouter, Route } from 'react-router-dom';
// import PrivateRoute from "./Components/privateRoute"

import SupportPage from "./Pages/Support";
import Home from "./Pages/Home";
import Login from "./Pages/Auth/Login";
import TranscriptPage from "./Pages/Wizards/Transcript"

import NavBar from "./Components/navbar";

import PrivateNavs from "./Configs/Routes/private"
import PublicNavs from "./Configs/Routes/public"

import './Css/bootstrap.css';
import './Css/App.css';

class App extends Component {
  render() {
    return (
      <HashRouter basename="">
          {(sessionStorage.getItem('user') 
            && <NavBar navs={PrivateNavs} className="mb-5" /> )
          || <NavBar navs={PublicNavs} className="mb-5" />}
          <Route exact strict path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          {/* <PrivateRoute exact strict  path="/" component={Home} /> */}
          <Route exact strict path="/transcript_wizard" component={TranscriptPage} />
          <Route exact strict path="/support" component={SupportPage} />
      </HashRouter>
    );
  }
}

export default App;
