import React from "react";
import { NavLink } from "react-router-dom";
import auth from "../services/authService";

function Header() {
  // To get the authenticated user.. it returns null if the user
  // is not logged in
  const user = auth.getCurrentUser();
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <NavLink className="navbar-brand" to="/">
        Network
      </NavLink>
      <div className="ml-auto">
        <ul className="navbar-nav ml-auto">
          {/* if the user is not logged in, view Login and Register links */}
          {!user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            </React.Fragment>
          )}

          {/* if the user is logged in */}
          {user && (
            <React.Fragment>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to={`/profile/${user && user._id}`}
                >
                  {user.username}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/"
                >
                  All posts
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={`/following/${user && user._id}`}>
                  Following
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/logout">
                  Logout
                </NavLink>
              </li>
            </React.Fragment>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;
