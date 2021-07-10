import React from "react";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import Home from "./Home";
import Overzicht from "./Overzicht";
import Login from "./Login";
import Header from "../Structuur/Header";
import Footer from "../Structuur/Footer";
import DetailPage from "./Detailpagina";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/detail/:name" component={DetailPage} />
        <Route exact path="/" component={Home} />
        <Route path="/overzicht" component={Overzicht} />
        <Route path="/login">
          <Login />
        </Route>
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
