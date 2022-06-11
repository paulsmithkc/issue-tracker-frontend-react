import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AppContexts';

function Header({ onLogout }) {
  const auth = React.useContext(AuthContext);

  return (
    <header id="Header">
      <nav className="navbar navbar-dark navbar-expand bg-dark">
        <span className="navbar-brand mx-2">Issue Tracker</span>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/project">
              Projects
            </NavLink>
          </li>
        </ul>
        {auth && (
          <span className="navbar-text ms-auto me-2">
            {auth.email || auth.userId}
          </span>
        )}
        {auth && (
          <ul className="navbar-nav">
            <li className="nav-item">
              <a className="nav-link" onClick={onLogout} href="/login">
                Logout
              </a>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
}

export default Header;
