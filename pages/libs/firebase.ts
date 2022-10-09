import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'; 
import 'firebase/storage'; 

const firebaseConfig = {
  apiKey: "AIzaSyC-ywZo-cIv-hGMo7Y02wbtBYLSarMUX8k",
  authDomain: "getmepizza-dapp.firebaseapp.com",
  projectId: "getmepizza-dapp",
  storageBucket: "getmepizza-dapp.appspot.com",
  messagingSenderId: "126056145728",
  appId: "1:126056145728:web:f5439743869ec4297dd0a5",
  measurementId: "G-D3118DXLDC"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
};

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage(); 