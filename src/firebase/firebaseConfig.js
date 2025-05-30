import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBxnIz3zfbLDQEv6XPmA9QyKcWxeDtEgmw",
  authDomain: "proyectoreact-efc51.firebaseapp.com",
  projectId: "proyectoreact-efc51",
  storageBucket: "proyectoreact-efc51.firebasestorage.app",
  messagingSenderId: "86810420759",
  appId: "1:86810420759:web:38e6028af96486cf379e52",
  measurementId: "G-H43D3X1V4Q"  
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
