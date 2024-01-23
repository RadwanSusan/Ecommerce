import { initializeApp } from 'firebase/app';
const firebaseConfig = {
	apiKey: 'AIzaSyASEi8Iycf-fMJFxPxKBfzNRr3WjaNjJoE',
	authDomain: 'pme-ecommerce.firebaseapp.com',
	projectId: 'pme-ecommerce',
	storageBucket: 'pme-ecommerce.appspot.com',
	messagingSenderId: '1001086603856',
	appId: '1:1001086603856:web:7b5450f29296bc79313755',
};
const app = initializeApp(firebaseConfig);
export default app;
