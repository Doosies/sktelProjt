// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB09YD5sq9HNY4F-kU73kvpX_yPT0ArPSs",
  authDomain: "sktel-37ae8.firebaseapp.com",
  projectId: "sktel-37ae8",
  storageBucket: "sktel-37ae8.appspot.com",
  messagingSenderId: "237581563498",
  appId: "1:237581563498:web:8537d5f939ac32d9067c13",
  measurementId: "G-W12QLDV1G5"
};

// Initialize Firebase
export const fire = () => {
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    console.log(app);
}