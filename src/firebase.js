import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDzipQeIPMC6624gFrHfYLXSmaO3zdMaYc",
  authDomain: "projet-react-f883b.firebaseapp.com",
  projectId: "projet-react-f883b",
  storageBucket: "projet-react-f883b.firebasestorage.app",
  messagingSenderId: "147595215691",
  appId: "1:147595215691:web:698c96a54221a83a385ece"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
