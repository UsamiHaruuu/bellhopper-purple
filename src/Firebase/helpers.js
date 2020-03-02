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

export {
  saveUuid,
  db,
};
