import React, { useState, useEffect } from 'react';
import {
  Block, Icon, Tab, Button,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPassport, faNotesMedical, faPlug, faMoneyBill,
} from '@fortawesome/free-solid-svg-icons';
import InfoBox from './InfoBox';
import Header from './Header';
import getCountryData from './CountryHelpers';
import { db } from '../../Firebase/helpers';

const DataToIcon = {
  'Visa Requirements': faPassport,
  // eslint-disable-next-line quote-props
  'Health': faNotesMedical,
  'Plug Type': faPlug,
  'Exchange Rate': faMoneyBill,
};

const DataLevel = ({ countryData, selected, setSelected }) => (
  <Tab.Group
    fullwidth
    kind="toggle"
    align="centered"
  >
    {countryData.slice(2).map((item) => (
      <Tab
        key={item.title}
        value={item.title}
        active={item.title === selected}
      >
        <Button
          className="tab-btn"
          onClick={() => setSelected(item.title)}
        >
          <Icon size="large" color={item.title === selected ? 'white' : 'black'}>
            <FontAwesomeIcon size="2x" icon={DataToIcon[item.title]} />
          </Icon>
        </Button>
      </Tab>
    ))}
  </Tab.Group>
);

const Dashboard = ({ tripId, uuid }) => {
  const [countryData, setCountryData] = useState([]);
  const [trip, setTrip] = useState({});
  const [selected, setSelected] = useState('Visa Requirements');
  const [selectedData, setSelectedData] = useState(undefined);

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

  useEffect(() => {
    setSelectedData(countryData.find((elem) => elem.title === selected));
  }, [countryData, selected]);

  const PriorityBoxes = countryData.length === 0
    ? <div className="loading-text">Loading...</div>
    : countryData.slice(0, 2).map((data) => (
      <InfoBox
        key={data.title}
        title={data.title}
        contents={data.contents}
        uuid={uuid}
        tripId={tripId}
        trip={trip}
        todo={data.todo}
      />
    ));

  const header = Object.values(trip).length > 0
    ? <Header country={trip.country} city={trip.city} />
    : '';

  return (
    <div>
      {header}
      {PriorityBoxes}
      <Block />
      <DataLevel countryData={countryData} selected={selected} setSelected={setSelected} />
      {selectedData && (
      <InfoBox
        key={selectedData.title}
        title={selectedData.title}
        contents={selectedData.contents}
        uuid={uuid}
        tripId={tripId}
        trip={trip}
        todo={selectedData.todo}
      />
      )}
    </div>
  );
};

export default Dashboard;
