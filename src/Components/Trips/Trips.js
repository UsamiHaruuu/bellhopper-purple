import React, { useEffect, useState } from 'react';
import {
  Notification, Block, Column,
} from 'rbx';
import { db } from '../../Firebase/helpers';

const Trips = ({ uuid }) => {
  const [tripData, setTripData] = useState([]);

  const redirect = (tripId) => {
    document.location.href = `/#/dashboard?tripId=${tripId}`;
    document.location.reload();
  };

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()[uuid]) {
        setTripData(snap.val()[uuid].trips);
      }
    };
    db.on('value', handleData);
    return () => {
      db.off('value', handleData);
    };
  }, [uuid]);

  if (tripData.length === 0) return <div />;

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Column.Group>
        <Column size={6} offset={3}>
          {Object.keys(tripData).map((tripId) => (
            <Notification
              color="link"
              key={tripId}
              onClick={() => redirect(tripId)}
            >
              <p style={{ float: 'left' }}>{tripData[tripId].country}</p>
              <p style={{ float: 'right' }}>{tripData[tripId].start_date}</p>
              <div style={{ clear: 'both' }} />
            </Notification>
          ))}
        </Column>
      </Column.Group>
      <Block />
    </div>
  );
};

export default Trips;
