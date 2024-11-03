import React from "react";
import { NavLink, Link } from "react-router-dom";
import logo from "../assets/Hi-Res-Logo.svg"; // Adjust path if necessary

function Navbar() {
  return (
    <nav className="navbar">
      {/* Logo and text wrapper */}
      <div className="navbar__logo-wrapper">
        <Link to="/" onClick={() => window.location.reload()}>
          <img src={logo} alt="Clarke Weather Inc. Logo" className="navbar__logo-image" />
        </Link>
        <h2 className="navbar__logo-text">Clarke Weather Inc.</h2>
      </div>
      <ul className="navbar__links">
        <li>
          <NavLink to="/" className={({ isActive }) => (isActive ? "active" : "")} end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "active" : "")}>
            About
          </NavLink>
        </li>
        <li>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "active" : "")}>
            Contact
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
