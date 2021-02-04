import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCOVU5_XPeTwkwU_3jA47kiahKfyMdfiEY",
    authDomain: "vue-notes-936f7.firebaseapp.com",
    databaseURL: "https://vue-notes-936f7.firebaseio.com",
    projectId: "vue-notes-936f7",
    storageBucket: "vue-notes-936f7.appspot.com",
    messagingSenderId: "989339984462",
    appId: "1:989339984462:web:1682a0f59fc585c605d91f"
}

// Get a Firestore instance
export const db = firebase
  .initializeApp(firebaseConfig)
  .firestore()

// Export types that exists in Firestore
// This is not always necessary, but it's used in other examples
const { Timestamp, GeoPoint } = firebase.firestore
export { Timestamp, GeoPoint }

// if using Firebase JS SDK < 5.8.0
db.settings({ timestampsInSnapshots: true })