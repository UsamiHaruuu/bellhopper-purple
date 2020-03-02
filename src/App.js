import React, { useEffect } from 'react';
import 'rbx/index.css';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Dashboard from './Components/Dashboard';
import Search from './Components/Search';
import List from './Components/List';
import Trips from './Components/Trips';
import Brand from './Components/Brand';
import Footer from './Components/Footer';
import { db, saveUuid, generateRandomId } from './Firebase/helpers';

function App() {
  const urlParams = new URLSearchParams(window.location.href.split('?')[1]);
  const tripId = urlParams.get('tripId');

  const [cookies, setCookie] = useCookies(['uuid']);
  if (!cookies.uuid) {
    const uuid = generateRandomId();
    setCookie('uuid', uuid);
    saveUuid(uuid);
  }

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()) {
        if (snap.val()[cookies.uuid] === undefined) {
          saveUuid(cookies.uuid);
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [cookies.uuid]);

  return (
    <div style={{ padding: 20 }}>
      <HashRouter className="padded">
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard tripId={tripId} uuid={cookies.uuid} />
            <Footer page="dashboard" />
          </Route>
          <Route exact path="/list">
            <List uuid={cookies.uuid} />
            <Footer page="list" />
          </Route>
          <Route path="/">
            <Brand />
            <Trips uuid={cookies.uuid} />
            <Search uuid={cookies.uuid} />
            <Footer page="search" />
          </Route>
        </Switch>
      </HashRouter>
    </div>
  );
}

export default App;
