import React, {useState, useEffect} from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import auth from "./services/authService";
import jwtDecode from "jwt-decode";
import "./App.css";
import Header from "./components/header";
import Footer from "./components/footer";
import Main from "./components/main";
import Profile from "./components/profile";
import Login from "./components/login";
import Register from "./components/register";
import Logout from './components/logout';
import ProtectedRoute from './components/common/protectedRoute';

function App() {

  const [user, setUser] = useState();

  useEffect(() => {
    setUser(auth.getCurrentUser());
  },[])

  return (
    <React.Fragment>
      <Header user={user}/>
      <div className="body">
        <div className="site-container">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <ProtectedRoute path="/profile/:id" component={Profile}/>
            {/* <Route path="/profile/:id" render={(props) => {
              if (!user) return <Redirect to="/login"/>
              return <Profile user={user} {...props}/>
            } } /> */}
            <Route path="/logout" component={Logout} />
            <Route path="/" exact render={(props) => <Main user={user} {...props}/>} />
          </Switch>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default App;
