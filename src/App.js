import React from "react";
import "rbx/index.css";
import { HashRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Search from "./Components/Search";
// import TravelAdvisory from './Components/Dashboard/CountryHelpers/TravelAdvisory';
import { PlugType } from "./Components/Dashboard/CountryHelpers/PlugType";
function App() {
  // TravelAdvisory('Germany');
  const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
  const country = urlParams.get("country");
  return (
    <div style={{ padding: 20 }}>
      <HashRouter className="padded">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard country={country} />
          </Route>
          <Route exact path="/search">
            <Search />
          </Route>
          <Route path="/">
            <Search />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
