import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";

import { firebaseConfig } from "./api-key";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics.isSupported().then((isSupported) => {
//   if (isSupported) {
//     analytics = firebase.analytics();
//   }
// })

const database = firebase.firestore();

const authInstance = firebase.auth;
const authMethod = firebase.auth();

const signInWithGoogle = async () => {
  const provider = new authInstance.GoogleAuthProvider();
  const result = await authMethod.signInWithPopup(provider);
  return result;
};

// const getProducts = async () => {
//   database
//     .collection("Products")
//     .get()
//     .then((querySnapshot) => {
//       let data = [];
//       querySnapshot.forEach((doc) => {
//         data.push(doc);
//         // console.log(doc.id, " => ", doc.data());
//         console.log("Data Get Succed");
//       });
//       return data;
//     })
//     .catch((error) => {
//       console.log("Error getting documents: ", error);
//     });
// };

export { database, authInstance, authMethod };
