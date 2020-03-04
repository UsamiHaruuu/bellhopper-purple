import firebase from 'firebase/app';
import 'firebase/database';
import firebaseConfig from './config';

firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const saveUuid = (uuid) => {
  db.child(uuid)
    .set({ trips: false })
    .catch((error) => alert(error));
};

const setCurrentTrip = (uuid, tripID) => {
  db.child(uuid)
    .child('currentTrip')
    .set({ tripID })
    .catch((error) => alert(error));
};

const deleteTrip = (uuid, tripId, currentTrip, setTrip, event) => {
  event.stopPropagation();
  db.child(uuid).child('trips').child(tripId).set([])
    .catch((error) => alert(error));
  if (tripId === currentTrip) {
    setCurrentTrip(uuid, []);
    setTrip(undefined);
  }
};

const generateRandomId = () => Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);

export {
  saveUuid,
  generateRandomId,
  setCurrentTrip,
  db,
  deleteTrip,
};
