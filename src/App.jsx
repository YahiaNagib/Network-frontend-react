import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from './components/main';

function App() {

  return (
    <div>
      <Header />
      <div className="body">
        <div className="site-container">
          <Switch>
            <Route path="/" component={Main}/>
            <Route path="/profile/:id" />
          </Switch>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
