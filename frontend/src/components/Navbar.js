import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <span className="brand-team">TEAM</span>
        <span className="brand-name">BROWN</span>
      </Link>
      <div className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'nav-link active' : 'nav-link'}>
          Home
        </Link>
        <Link to="/add" className={location.pathname === '/add' ? 'nav-link active' : 'nav-link'}>
          Add Member
        </Link>
        <Link to="/view" className={location.pathname === '/view' ? 'nav-link active' : 'nav-link'}>
          View Members
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
