import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: 'AIzaSyC2kJqeVMXtEHUUEoCEsZtoNYBb86LaV8w',
  authDomain: 'howthefunction.firebaseapp.com',
  databaseURL: 'https://howthefunction.firebaseio.com',
  projectId: 'howthefunction',
  storageBucket: 'howthefunction.appspot.com',
  messagingSenderId: '118949988828'
};

firebase.initializeApp(config);

const db = firebase.database();

export default db;
