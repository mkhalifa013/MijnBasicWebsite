import React from "react";
import { NavLink} from "react-router-dom";
import { callApi } from "../utils";

// Hooks
import useLogo from "../hooks/getLogo";

function Footer() {
  const { logo, error } = useLogo();

  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        {logo && (
          
          <NavLink className="nav-link" className="text-dark" to="/">
            {logo.sitename}
            </NavLink>
        )}
      </div>
    </footer>
  );
}

export default Footer;
