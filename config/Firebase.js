import * as firebase from 'firebase';

// Optionally import the services that you want to use
import "firebase/auth";
import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyCB9ZM09w0yeWZ0Np9XXks4G50eYKFVSYs',
  authDomain: 'fixit-46444.firebaseapp.com',
  databaseURL: 'https://fixit-46444.firebaseio.com',
  projectId: 'fixit-46444',
  storageBucket: 'fixit-46444.appspot.com',
  //messagingSenderId: '430332052455',
  appId: '1:430332052455:android:5e8620a5468a0fb6017342',
  //measurementId: 'G-measurement-id',
};

firebase.initializeApp(firebaseConfig);

export const database = firebase.database();
export const googleAuth = new firebase.auth.GoogleAuthProvider();
export const auth = new firebase.auth();