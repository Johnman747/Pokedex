import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCBpF9dv_9QtmWzGVqntZ7dQos2x98gIYY",
  authDomain: "pokedex-25358.firebaseapp.com",
  databaseURL: "https://pokedex-25358.firebaseio.com",
  projectId: "pokedex-25358",
  storageBucket: "pokedex-25358.appspot.com",
  messagingSenderId: "70726142589",
  appId: "1:70726142589:web:3dab24d4fdb615be07bf14"
  };

//initialize firebase
firebase.initializeApp(firebaseConfig);

export default firebase