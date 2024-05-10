import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCn3tFjAlfh_c-OrjtkxOEGCWxzZ2QGnQs",  // process.env.apiKey
  authDomain: "dct-webcity-9e8f6.firebaseapp.com",  // process.env.authDomain
  projectId: "dct-webcity-9e8f6",  // process.env.projectId
  storageBucket: "dct-webcity-9e8f6.appspot.com", // process.env.storageBucket
  messagingSenderId: "585958748133", // process.env.messagingSenderId
  appId: "1:585958748133:web:4e15391409cfa63a3b090c" // process.env.appId
};
// const firebaseConfig = {
//   apiKey: "AIzaSyC0LTGTMwW6itSCq8yL5CiU2oZGMmeHIYg",
//   authDomain: "dct-webcity-backup.firebaseapp.com",
//   projectId: "dct-webcity-backup",
//   storageBucket: "dct-webcity-backup.appspot.com",
//   messagingSenderId: "1000882908454",
//   appId: "1:1000882908454:web:b13d0d1e839c2e040ae5e7"
// };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const imgDB = getStorage(app)
const txtDB = getFirestore(app)

export {imgDB,txtDB};