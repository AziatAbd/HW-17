import firebase from "firebase/app"
import "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAZnqSr2kMjEbvpWLgrNHScLS0KnuT7OZE",
    authDomain: "expense-tracker-bf130.firebaseapp.com",
    databaseURL: "https://expense-tracker-bf130-default-rtdb.firebaseio.com",
    projectId: "expense-tracker-bf130",
    storageBucket: "expense-tracker-bf130.appspot.com",
    messagingSenderId: "997285925405",
    appId: "1:997285925405:web:268392aaeda72ee074acf4",
    measurementId: "G-V5PK0R22QY"
  };

  firebase.initializeApp(firebaseConfig)
  const databaseRef = firebase.database().ref()
  export const expenseRef = databaseRef.child("expense")
  export default firebase