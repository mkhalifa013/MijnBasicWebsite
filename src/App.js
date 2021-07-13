import React from "react";
import Router from "./Core/Router";
import "./Style/custom.scss";

import { CurrentUserProvider } from "./Context/CurrentUser";

export default function App() {
  return (
    <CurrentUserProvider>
      <Router />
    </CurrentUserProvider>
  );
}
