// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyBch-p9-S9nvn1PgOiHGR9Ng4rwjt7Xtb8",
	authDomain: "pmeeco.firebaseapp.com",
	projectId: "pmeeco",
	storageBucket: "pmeeco.appspot.com",
	messagingSenderId: "474970829105",
	appId: "1:474970829105:web:fe1888900e772815760010",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
