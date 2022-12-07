import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyCEtrO8UWibdutpU0gllfm91VDlnIpdEkc",
    authDomain: "social-images-store.firebaseapp.com",
    projectId: "social-images-store",
    storageBucket: "social-images-store.appspot.com",
    messagingSenderId: "493066021198",
    appId: "1:493066021198:web:20db8a0b7617c32a0a561f",
    measurementId: "G-S1MDTQQY79"
};

const firebase = initializeApp(firebaseConfig);

const storage = getStorage(firebase);

export { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject, firebase as default };