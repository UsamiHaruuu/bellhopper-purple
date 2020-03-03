import React, { useState, useEffect } from 'react';
import InfoBox from './InfoBox';
import Header from './Header';
import getCountryData from './CountryHelpers';
import { db } from '../../Firebase/helpers';

const Dashboard = ({ tripId, uuid }) => {
  const [countryData, setCountryData] = useState([]);
  const [trip, setTrip] = useState({});
  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()) {
        const data = snap.val();
        if (data[uuid] !== undefined && data[uuid].trips[tripId] !== undefined) {
          setTrip(data[uuid].trips[tripId]);
        }
      }
    };
    db.on('value', handleData, (error) => alert(error));
    return () => {
      db.off('value', handleData);
    };
  }, [tripId, uuid]);

  useEffect(() => {
    const getDataAsync = async () => getCountryData(
      trip.country, trip.city, trip.start_date, trip.end_date, setCountryData,
    );
    if (Object.values(trip).length > 0) {
      getDataAsync();
    }
  }, [trip]);

  const InfoBoxes = countryData.length === 0
    ? <div className="loading-text">Loading...</div>
    : countryData.map((data) => (
      <InfoBox
        key={data.title}
        title={data.title}
        contents={data.contents}
      />
    ));

  const header = Object.values(trip).length > 0
    ? <Header country={trip.country} city={trip.city} />
    : '';

  return (
    <div>
      {header}
      {InfoBoxes}
    </div>
  );
};

export default Dashboard;
