import React from "react";
import { NavLink } from "react-router-dom";

function Header({ user }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <NavLink className="navbar-brand" to="/">
        Network
      </NavLink>
      <div className="ml-auto">
        <ul className="navbar-nav ml-auto">
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
                <NavLink className="nav-link" to="/register">
                  Following
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
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
