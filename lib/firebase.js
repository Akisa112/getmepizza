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

export const firestore = firebase.firestore();
export const storage = firebase.storage(); 
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const increment = firebase.firestore.FieldValue.increment;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
 export async function getUserWithUsername(username) {
  if (username) {
    console.log('Reading User from Firestore')
    const usersRef = firestore.collection('users');
    const query = usersRef.where('username', '==', username).limit(1);
    const userDoc = (await query.get()).docs[0];
    
    return userDoc;
  } else {
    return 
  }
  
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

export function userToJson(user) {
  const data = user.data();
  return {
    ...data,
  }
}