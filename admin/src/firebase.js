// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyASEi8Iycf-fMJFxPxKBfzNRr3WjaNjJoE',
  authDomain: 'pme-ecommerce.firebaseapp.com',
  projectId: 'pme-ecommerce',
  storageBucket: 'pme-ecommerce.appspot.com',
  messagingSenderId: '1001086603856',
  appId: '1:1001086603856:web:7b5450f29296bc79313755',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
