import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header id="Header">
      <nav className='navbar navbar-dark navbar-expand bg-dark'>
        <span className='navbar-brand'>Issue Tracker</span>
        <ul class="navbar-nav">
          <li className='nav-item'>
            <NavLink className="nav-link" to="/">Home</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className="nav-link" to="/login">Login</NavLink>
          </li>
          <li className='nav-item'>
            <NavLink className="nav-link" to="/project">Projects</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
