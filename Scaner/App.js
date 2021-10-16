import React from 'react';
import firebase from 'firebase';
import Navigate from './Navigate';

const firebaseConfig = {
  apiKey: "AIzaSyD251mzIpX0qBo_QZL2RJ0oK2YnmkzUXmM",
  authDomain: "scanner-react-native.firebaseapp.com",
  projectId: "scanner-react-native",
  storageBucket: "scanner-react-native.appspot.com",
  messagingSenderId: "103938001002",
  appId: "1:103938001002:web:a4badfac3b1f0e72496213",
  measurementId: "G-QJPKELPQXY"
};
if(firebase.apps.length === 0){
  firebase.initializeApp(firebaseConfig)
}

export default function App() {
  return (
    <Navigate/>
  );
}
