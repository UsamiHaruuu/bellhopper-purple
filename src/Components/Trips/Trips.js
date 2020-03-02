import React, { useEffect, useState } from 'react';
import {
  Notification, Block, Column,
} from 'rbx';
import { db } from '../../Firebase/helpers';

const Trips = ({ uuid }) => {
  const [tripData, setTripData] = useState([]);

  const redirect = (item) => {
    document.location.href = `/#/dashboard?country=${item.country}&startDate=${item.start_date}`;
    document.location.reload();
  };

  useEffect(() => {
    const handleData = (snap) => {
      if (snap.val()[uuid]) {
        setTripData(Object.values(snap.val()[uuid].trips));
      }
    };
    db.on('value', handleData);
    return () => {
      db.off('value', handleData);
    };
  }, []);

  if (tripData.length === 0) return <div />;

  return (
    <div style={{ paddingBottom: '20px' }}>
      <Column.Group>
        <Column size={6} offset={3}>
          {tripData.map((item) => (
            <Notification
              color="link"
              key={item}
              onClick={() => redirect(item)}
            >
              <p style={{ float: 'left' }}>{item.country}</p>
              <p style={{ float: 'right' }}>{item.start_date}</p>
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
