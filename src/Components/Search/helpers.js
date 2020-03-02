import { db } from '../../Firebase/helpers';

const saveTrip = (uuid, tripId, city, country, startDate, endDate) => {
  const trip = {
    start_date: JSON.stringify(startDate).split('T')[0].replace('"', ''),
    end_date: JSON.stringify(endDate).split('T')[0].replace('"', ''),
    country,
  };
  if (city) {
    trip.city = city;
  }
  db.child(uuid)
    .child('trips')
    .child(tripId)
    .update(trip)
    .catch((error) => alert(error));
};

export {
  saveTrip,
};
