import React from "react";

function Header() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <a className="navbar-brand" href="/">
        Network
      </a>
      <div className="ml-auto">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a className="nav-link" href="/">
              <strong>Yahia</strong>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              All Posts
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Following
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="/">
              Log Out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
