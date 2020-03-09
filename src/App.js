import React, { useState, useEffect } from 'react';
import { Block } from 'rbx';
import 'rbx/index.css';
import {
  HashRouter, Route, Switch,
} from 'react-router-dom';
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
  const [tripId, setTripId] = useState(urlParams.get('tripId'));
  const [currentTripDb, setCurrentTripDb] = useState(undefined);

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
        } else if (snap.val()[cookies.uuid].currentTrip) {
          if (tripId === null) {
            setTripId(snap.val()[cookies.uuid].currentTrip.tripID);
          }
          setCurrentTripDb(snap.val()[cookies.uuid].currentTrip.tripID);
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [cookies.uuid, tripId]);

  return (
    <div style={{
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 5,
      paddingRight: 5,
    }}
    >
      <HashRouter className="padded">
        <Brand />
        <Switch>
          <Route exact path="/dashboard">
            <Dashboard tripId={tripId} uuid={cookies.uuid} />
          </Route>
          <Route exact path="/list">
            <List uuid={cookies.uuid} tripId={tripId} />
          </Route>
          <Route path="/">
            <Trips uuid={cookies.uuid} currentTrip={currentTripDb} setTrip={setTripId} />
            <Search uuid={cookies.uuid} />
          </Route>
        </Switch>
        <Block />
        <Footer tripId={tripId} />
      </HashRouter>
    </div>
  );
}

export default App;
