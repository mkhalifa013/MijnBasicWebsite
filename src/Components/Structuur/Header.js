import React from "react";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container">
      <li className="nav-item">
      <NavLink className="nav-link" exact activeClassName="active" to="/">
        Home
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink  className="nav-link" activeClassName="active" to="/overzicht">
        Overzicht
      </NavLink>
      </li>
      <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to="/login">
        Login
      </NavLink>
      </li>
      </div>
    </nav>
  );
}
export default Header;