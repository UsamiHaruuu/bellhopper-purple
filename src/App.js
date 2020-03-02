import React from 'react';
import 'rbx/index.css';
import { Block } from 'rbx';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Dashboard from './Components/Dashboard';
import Search from './Components/Search';
import List from './Components/List/List';
import Brand from './Components/Brand';

function App() {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
  const country = urlParams.get('country');
  const city = urlParams.get('city');
  const startDate = urlParams.get('startDate');

  const [cookies, setCookie] = useCookies(['uuid']);
  if (!cookies.uuid) {
    const uuid = Math.random().toString(36).substring(2, 15)
                 + Math.random().toString(36).substring(2, 15);
    setCookie('uuid', uuid);
  }

  return (
    <div style={{ padding: 20 }}>
      <HashRouter className="padded">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard country={country} city={city} startDate={startDate} uuid={cookies.uuid} />
          </Route>
          <Route exact path="/search">
            <Search uuid={cookies.uuid} />
          </Route>
          <Route exact path="/list">
            <List uuid={cookies.uuid} />
          </Route>
          <Route path="/">
            <Brand />
            <Block />
            <Search uuid={cookies.uuid} />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
