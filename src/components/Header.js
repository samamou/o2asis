import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    
    <header className="header">
      
      <div className="Logo">
      o₂asis 

      </div>

      <nav className="nav">
        <ul className="nav__list">
          <li className="nav__item">
            <Link to="/" className="nav__link">Home</Link>
          </li>
          <li className="nav__item">
            <Link to="/dashboard" className="nav__link">Dashboard</Link>
          </li>
          <li className="nav__item">
            <Link to="/contact" className="nav__link">Contact</Link>
          </li>
          <li className="nav__item">
            <Link to="/my-plants" className="nav__link">My Plants</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
