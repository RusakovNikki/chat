import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";

import App from './App';

const firebaseConfig = {
  apiKey: "AIzaSyD93Sbno-Hk-SX3DBPMpSyueg6gBghrGDQ",
  authDomain: "chat-react-77bfa.firebaseapp.com",
  projectId: "chat-react-77bfa",
  storageBucket: "chat-react-77bfa.appspot.com",
  messagingSenderId: "943350185763",
  appId: "1:943350185763:web:dab80e93c888b915939696",
  measurementId: "G-2ZGCG8ESGH"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth()
const firestore = getFirestore()

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    auth,
    firestore
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Context.Provider>
)