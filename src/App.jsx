import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from './components/main';
import Profile from './components/profile';

function App() {

  return (
    <React.Fragment>
      <Header />
      <div className="body">
        <div className="site-container">
          <Switch>
            <Route path="/profile/:id" component={Profile} />
            <Route path="/" component={Main}/>
          </Switch>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
