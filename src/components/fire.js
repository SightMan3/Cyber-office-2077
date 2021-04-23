import firebase from "firebase";

var firebaseConfig = {
    apiKey: "AIzaSyBqwGjYGHqtzx0XqiQHbXzK3VsUi6AaIiE",
    authDomain: "cyberoffice2077.firebaseapp.com",
    projectId: "cyberoffice2077",
    storageBucket: "cyberoffice2077.appspot.com",
    messagingSenderId: "1066266625873",
    appId: "1:1066266625873:web:1ad0486bf0de7936fe7570",
    measurementId: "G-KWX7B5DEN9"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



export default firebase
