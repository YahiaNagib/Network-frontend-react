import React, {useState, useEffect} from "react";
import { Route, Switch } from "react-router-dom";
import jwtDecode from "jwt-decode";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    const jwt = localStorage.getItem("token");
    try {
      const user = jwtDecode(jwt);
      setUser(user);
    }
    catch {}
  },[])

  return (
    <React.Fragment>
      <Header user={user}/>
      <div className="body">
        <div className="site-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/profile/:id" component={Profile} />
            <Route path="/" component={Main} />
          </Switch>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
