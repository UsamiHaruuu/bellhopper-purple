import React, { useEffect, useState } from 'react';
import {
  Notification, Block, Column, Delete,
} from 'rbx';
import { db, setCurrentTrip, deleteTrip } from '../../Firebase/helpers';

const Trips = ({ uuid, currentTrip, setTrip }) => {
  const [tripData, setTripData] = useState([]);

  const redirect = (tripId) => {
    setCurrentTrip(uuid, tripId);
    document.location.href = `/#/dashboard?tripId=${tripId}`;
    document.location.reload();
  };

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()[uuid]) {
        const data = snap.val()[uuid].trips;
        setTripData(data);
      }
    };
    db.on('value', handleData);
    return () => {
      db.off('value', handleData);
    };
  }, [uuid]);

  if (!tripData) return <div />;

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Column.Group>
        <Column size={6} offset={3}>
          {Object.keys(tripData).map((tripId) => (
            <div key={tripId} style={{ paddingBottom: 10 }}>
              <Notification
                color="link"
                onClick={() => redirect(tripId)}
              >
                <Delete
                  as="button"
                  onClick={(event) => deleteTrip(uuid, tripId, currentTrip, setTrip, event)}
                />
                <p style={{ float: 'left' }}>{tripData[tripId].country}</p>
                <p style={{ float: 'right' }}>{tripData[tripId].start_date}</p>
                <div style={{ clear: 'both' }} />
              </Notification>
            </div>
          ))}

        </Column>
      </Column.Group>
      <Block />
    </div>

  );
};

export default Trips;
