import { NavLink } from "react-router-dom";

/*
  Component: Menu
  Description: Responsible for rendering a menu in the main nav
*/
export default () => (
  <ul className="navbar-nav">
    <li className="nav-item">
      <NavLink className="nav-link" exact activeClassName="active" to="/">
        Home
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to="/overzicht">
        Overzicht
      </NavLink>
    </li>
    <li className="nav-item">
      <NavLink className="nav-link" activeClassName="active" to="/register">
        Register
      </NavLink>
    </li>
  </ul>
);
