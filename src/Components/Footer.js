import React from "react";
import { callApi } from "../utils";

// Hooks
import useLogo from "../hooks/getLogo";

function Footer() {
  const { logo, error } = useLogo();

  return (
    <footer className="bg-light text-center text-lg-start">
      <div className="text-center p-3">
        {logo && (
          <a className="text-dark" href="">
            {logo.sitename}
          </a>
        )}
      </div>
    </footer>
  );
}

export default Footer;
