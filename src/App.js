import React from 'react';
import 'rbx/index.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Search from './Components/Search';

function App() {
  TravelAdvisory('Germany')
  return (
    <div style={{ padding: 20 }}>
      <HashRouter className="padded">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard country="Costa Rica" />
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
