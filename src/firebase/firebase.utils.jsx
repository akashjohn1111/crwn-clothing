import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAk2_P-E8-5htFkZejUrDI768QPOjE9PaI",
    authDomain: "crown-db-a3da8.firebaseapp.com",
    databaseURL: "https://crown-db-a3da8.firebaseio.com",
    projectId: "crown-db-a3da8",
    storageBucket: "crown-db-a3da8.appspot.com",
    messagingSenderId: "775876855110",
    appId: "1:775876855110:web:bec14d3fa285b750d25147",
    measurementId: "G-3QD1V11ZNX"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;