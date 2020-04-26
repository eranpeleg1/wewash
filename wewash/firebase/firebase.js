import firebase from 'firebase';

// Optionally import the services that you want to use

//import "firebase/auth";
//import "firebase/database";
//import "firebase/firestore";
//import "firebase/functions";
//import "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAwXiw2bWkR6sT7108EPPCNeBkkixEtAEw",
    authDomain: "wewash-cb69f.firebaseapp.com",
    databaseURL: "https://wewash-cb69f.firebaseio.com",
    projectId: "wewash-cb69f",
    storageBucket: "wewash-cb69f.appspot.com",
    messagingSenderId: "247131740049"
};

firebase.initializeApp(firebaseConfig)


firebase.auth().onAuthStateChanged((user, setUserId) => {
    if (user != null) {
        console.log("We are authenticated now!");
    } else {
        // Do other things
        console.log("We are not authenticated!");
    }

});

export default firebase