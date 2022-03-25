// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCFoNdju5Y2lBTbG0YLSZdsKy7phVBlVcs',
  authDomain: 'final-isdi-coders.firebaseapp.com',
  projectId: 'final-isdi-coders',
  storageBucket: 'final-isdi-coders.appspot.com',
  messagingSenderId: '649528423764',
  appId: '1:649528423764:web:92f3c8ba54d724bcb5c4c1',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);
