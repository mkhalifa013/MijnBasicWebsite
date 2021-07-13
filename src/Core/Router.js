// Dependencies
import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";

// Pages
import Home from "../Pages/Home";
import Overzicht from "../Pages/Overzicht";
import Login from "../Pages/Login";
import DetailPage from "../Pages/Detailpagina";
import Reg from "../Pages/Register";

// Components
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/detail/:id" component={DetailPage} />
        <Route exact path="/" component={Home} />
        <Route path="/overzicht" component={Overzicht} />
        <Route path="/register" component={Reg} />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
