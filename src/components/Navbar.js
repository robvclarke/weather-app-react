import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import logo from "../assets/GradientLogo.png"; // Adjust path if necessary

function Navbar() {
  const location = useLocation();

  const handleLogoClick = () => {
    // If already on the homepage, refresh the page
    if (location.pathname === "/") {
      window.location.reload();
    }
  };

  return (
    <nav className="navbar">
      {/* Logo and text wrapper */}
      <div className="navbar__logo-wrapper">
        <Link to="/" onClick={handleLogoClick}>
          <img src={logo} alt="Clarke Weather Inc. Logo" className="navbar__logo-image" />
        </Link>
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
          <NavLink to="/support" className={({ isActive }) => (isActive ? "active" : "")}>
            Support Us
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
