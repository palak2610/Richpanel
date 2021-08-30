import firebase from "firebase";

if (!firebase.apps.length) {
  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDc5n0FDNOPbugNMEguxVmlAwzndOMg_Bs",
    authDomain: "richpanel-ae850.firebaseapp.com",
    databaseURL: "https://richpanel-ae850-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "richpanel-ae850",
    storageBucket: "richpanel-ae850.appspot.com",
    messagingSenderId: "476312510637",
    appId: "1:476312510637:web:4d29547d913f3c2bf3a624"
  });
} else {
  firebase.app();
}

const db = firebase.database();
const auth = firebase.auth();

export { db, auth };
