import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Search from './Components/Search';
 
function App() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/search">
          <Search />
        </Route>
        <Route path="/">
          <Search />
        </Route>
      </Switch>
    </HashRouter>
  );
}

export default App;
