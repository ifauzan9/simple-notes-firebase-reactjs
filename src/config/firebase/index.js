import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCUybdErEzNYvgf88ESUOe-2YtgvZ16QUU",
    authDomain: "notes-hooks-firebase-1.firebaseapp.com",
    projectId: "notes-hooks-firebase-1",
    storageBucket: "notes-hooks-firebase-1.appspot.com",
    messagingSenderId: "238060564640",
    appId: "1:238060564640:web:9795ec147e55a9578619c5"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const database = firebase.database();
export default firebase;
