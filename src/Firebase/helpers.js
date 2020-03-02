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

const currentTrip = (uuid, tripID) => {
  db.child(uuid)
    .child('currentTrip')
    .set({tripID})
    .catch((error) => alert(error));
}

const generateRandomId = () => Math.random().toString(36).substring(2, 15)
  + Math.random().toString(36).substring(2, 15);

export {
  saveUuid,
  generateRandomId,
  currentTrip,
  db,
};
