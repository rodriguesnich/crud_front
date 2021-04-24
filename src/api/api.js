import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

import { firebaseConfig } from "./api-key"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics.isSupported().then((isSupported) => {
//   if (isSupported) {
//     analytics = firebase.analytics();
//   }
// })

export const database = firebase.firestore();
// export const auth = firebase.auth()
