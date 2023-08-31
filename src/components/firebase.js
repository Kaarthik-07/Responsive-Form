import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getDatabase, ref, onValue , set } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-database.js";


//const firbase = require('firebase');

var firebaseApp = {
        apiKey: "AIzaSyAtcILO8DitC2U1ijGPCTPdP5A6QLx7skY",
        authDomain: "react-contact-fd6b9.firebaseapp.com",
        projectId: "react-contact-fd6b9",
        storageBucket: "react-contact-fd6b9.appspot.com",
        messagingSenderId: "666661561001",
        appId: "1:666661561001:web:febc8ff4e6f099875f3fb8",
        measurementId: "G-CBP49QWC3W"
};
const app = initializeApp(firebaseApp);


var db = getDatabase(app);

export {db , ref ,onValue, set};