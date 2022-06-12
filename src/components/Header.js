import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../AppContexts';

function Header({ onLogout }) {
  const auth = useContext(AuthContext);

  return (
    <header id="Header">
      <nav className="navbar navbar-dark navbar-expand bg-dark">
        <NavLink className="navbar-brand mx-2" to="/">
          Issue Tracker
        </NavLink>
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/">
              Home
            </NavLink>
          </li>
          {auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/project">
                Projects
              </NavLink>
            </li>
          )}
        </ul>
        <ul className="navbar-nav ms-auto">
          {auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/user/me">
                {auth.email || auth.userId}
              </NavLink>
            </li>
          )}
          {auth && (
            <li className="nav-item">
              <a className="nav-link" onClick={onLogout} href="/login">
                Logout
              </a>
            </li>
          )}
          {!auth && (
            <li className="nav-item">
              <NavLink className="nav-link" to="/login">
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
