import React, { useEffect, useState } from 'react';
import {
  Notification, Block, Column, Button, Icon,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
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
            <div key={tripId}>
              <Notification
                color="link"
                onClick={() => redirect(tripId)}
                style={{ display: 'flex' }}
              >
                <p>
                  {tripData[tripId].country}
                  {', '}
                  {tripData[tripId].start_date}
                </p>
                <div style={{ clear: 'both' }} />
                <Button
                  style={{ float: 'right', marginLeft: '80px' }}
                  outlined
                  onClick={(event) => deleteTrip(uuid, tripId, currentTrip, setTrip, event)}
                >
                  <Icon size="small">
                    <FontAwesomeIcon icon={faTimes} />
                  </Icon>
                </Button>
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
