import React from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "../CurrentUser";
import { callApi } from "../../utils";


function Header() {
  
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();

  console.log(user)

  const handleLogout = async () => {
    await callApi("/logout", "POST");
    dispatch({ type: "LOGOUT" });
  }

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