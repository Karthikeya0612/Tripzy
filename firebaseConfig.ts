import { initializeApp } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCwSkJaSf8zG3tJKIY9iNDURmZPbVPydP4",
  authDomain: "tripzy-7573b.firebaseapp.com",
  projectId: "tripzy-7573b",
  storageBucket: "tripzy-7573b.firebasestorage.app",
  messagingSenderId: "380335008782",
  appId: "1:380335008782:web:3030052c2eaa257d33a05f",
  measurementId: "G-E1D5XFMCK8"
};
const app = initializeApp(firebaseConfig);
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const db = getFirestore(app);