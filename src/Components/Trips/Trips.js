import React, { useEffect, useState } from 'react';
import {
  Notification, Block, Column, Button, Icon, Level,
} from 'rbx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { db, currentTrip, deleteTrip } from '../../Firebase/helpers';

const Trips = ({ uuid }) => {
  const [tripData, setTripData] = useState([]);

  const redirect = (tripId) => {
    currentTrip(uuid, tripId);
    document.location.href = `/#/dashboard?tripId=${tripId}`;
    document.location.reload();
  };
  const filter = (data) => Object.keys(data).map((key) => { if (data[key].status === false) delete data[key]; });

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()[uuid]) {
        const data = snap.val()[uuid].trips;
        filter(data);
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
            <Level>
              <Level.Item align="left">
                <Notification
                  color="link"
                  key={tripId}
                  onClick={() => redirect(tripId)}
                >
                  <p>
                    {tripData[tripId].country}
                    {', '}
                    {tripData[tripId].start_date}
                  </p>
                  <div style={{ clear: 'both' }} />
                  <Button
                    style={{ float: 'right' }}
                    outlined
                    onClick={(event) => deleteTrip(uuid, tripId, event)}
                  >
                    <Icon size="small">
                      <FontAwesomeIcon icon={faTimes} />
                    </Icon>
                  </Button>
                </Notification>
              </Level.Item>
            </Level>

          ))}

        </Column>
      </Column.Group>
      <Block />
    </div>

  );
};

export default Trips;
