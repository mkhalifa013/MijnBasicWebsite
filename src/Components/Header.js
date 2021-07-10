import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "../Context/CurrentUser";
import { callApi } from "../utils";

// Components
import Logo from "./Logo";
import Menu from "./Menu";
import MenuActions from "./MenuActions";

// Hooks
import useLogo from "../hooks/getLogo";

const Header = () => {
  const dispatch = useDispatchCurrentUser();
  const { user, isLoading: isUserLoading, isAuthenticated } = useCurrentUser();
  const { isLoading, logo, error } = useLogo();

  const handleLogout = async () => {
    await callApi("/logout", "POST");
    dispatch({ type: "LOGOUT" });
  };

  if (isLoading) {
    return (
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container">
          {/* Logo */}
          <div className="col text-white">laden...</div>

          {/* Main Menu Items */}
          <div className="navbar-collapse">
            <Menu />
          </div>

          {/* Main Menu Actions */}
          <div className="navbar_actions">
            <MenuActions
              handleLogout={handleLogout}
              user={user}
              isLoading={isUserLoading}
            />

            {Object.keys(user).length > 0 && !isAuthenticated && (
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/login"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container">
        {/* Logo */}
        <div className="col">{logo && <Logo logo={logo} />}</div>

        {/* Main Menu Items */}
        <div className="navbar-collapse">
          <Menu />
        </div>

        {/* Main Menu Actions */}
        <div className="navbar_actions">
          <MenuActions
            handleLogout={handleLogout}
            user={user}
            isLoading={isUserLoading}
          />

          {Object.keys(user).length > 0 && !isAuthenticated && (
            <NavLink className="nav-link" activeClassName="active" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
};
export default Header;
