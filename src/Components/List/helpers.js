import { db } from '../../Firebase/helpers';


const addToList = (uuid, tripId, trip, unit) => {
  const newTrip = trip;
  const array = [];
  if (newTrip.list === undefined) {
    newTrip.list = array;
  }
  const item = {
    complete: false,
    description: '',
  };
  item.description = unit;
  newTrip.list.push(item);
  db.child(uuid).child('trips').child(tripId).update(newTrip);
};

const removeTask = (uuid, tripId, trip, element) => {
  const newTrip = trip;
  let newList = trip.list.slice(0);
  const helperArray = newList.map((thing) => thing.description);
  const itemIndex = helperArray.indexOf(element.description);
  newList.splice(itemIndex, 1);
  if (newList.length === 0) {
    newList = [];
  }
  newTrip.list = newList;
  db.child(uuid).child('trips').child(tripId).update(newTrip);
  return newList;
};

const completeTask = (uuid, tripId, trip, element) => {
  const newTrip = trip;
  const newList = trip.list.slice(0);
  const helperArray = newList.map((thing) => thing.description);
  const itemIndex = helperArray.indexOf(element.description);
  newList[itemIndex].complete = !newList[itemIndex].complete;
  newTrip.list = newList;
  db.child(uuid).child('trips').child(tripId).update(newTrip);
  return newList;
};

export {
  addToList,
  removeTask,
  completeTask,
};
