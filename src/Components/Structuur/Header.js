import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import { useCurrentUser, useDispatchCurrentUser } from "../CurrentUser";
import { callApi } from "../../utils";


const Header = () => {
  const dispatch = useDispatchCurrentUser();
  const user = useCurrentUser();
  const [logotje, setLogo] = React.useState([]);
  const [error, setError] = React.useState(null);

React.useEffect(() => {
    async function getData() {
      try {
        const data = await callApi("/logo", "GET");

        if (data.error) {
          throw data;
        }

        setLogo(data);
      } catch (error) {
        console.log("ERROR", error);
        setError(error);
      }
    }
    getData();
  }, []);



  const handleLogout = async () => {
    await callApi("/logout", "POST");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container">
        <div className="col">
        {logotje.siteLogo && (
          <img
            src={`http://localhost:1337${logotje.siteLogo.url}`}
            className="logo"
            alt=""
          />
        )}
        </div>
        <div className="navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                exact
                activeClassName="active"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                activeClassName="active"
                to="/overzicht"
              >
                Overzicht
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar_actions">
          {user.isAuthenticated ? (
            <div className="row justify-content-center">
              <div className="col">
                <p className="text-light m-0 p-1 float-end">{user.username}</p>
                {user.profi && (
                  <img
                    src={`http://localhost:1337${user.profi.url}`}
                    className="user mb-2"
                    alt="..."
                  />
                )}
              </div>
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink className="nav-link" activeClassName="active" to="/login">
              Login
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
export default Header;


