// Import the functions you need from the SDKs you need
import { initializeApp,getApps, getApp } from "firebase/app";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCC8XHeQDMnpHWcOLSJO6p-dqJl-zqhrAA",
  authDomain: "trouvailler-auth.firebaseapp.com",
  projectId: "trouvailler-auth",
  storageBucket: "trouvailler-auth.appspot.com",
  messagingSenderId: "4473367843",
  appId: "1:4473367843:web:5233f6cc45e5570443f096"
};

// Initialize Firebase
const app = getApps().length === 0 ?initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export const logOut = () => {
  auth.signOut()
}
const provider = new GoogleAuthProvider()

export {auth, provider};