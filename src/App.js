import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { submitArtist, submitRelease } from "./functions";

import Header from "./components/Header";
import ReleasePage from "./components/Release";
import ArtistPage from "./components/Artist";
import SignInPage from "./components/SignIn";
import ProfilePage from "./components/Profile";

import './App.css';

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [userName, setUserName] = useState(undefined);

  // Firebase authentication
  initFirebaseAuth();

  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    if (user) { // User is signed in!
      setIsSignedIn(true);
      setUserName(getAuth().currentUser.displayName)
    } else {
      setIsSignedIn(false);
    }
  }

  // Send data to firestore
  const sendPrivateData = async () => {
    try {
      await setDoc(doc(getFirestore(), getAuth().currentUser.uid, 'test'), {
        test: 'data',
      });    
    }
    catch(error) {
      console.error('Error writing new task to Firebase Database', error);
    }
  }

  return (
    <BrowserRouter>
      <Header userStatus={isSignedIn} user={userName} />
      <Routes>
        <Route path="/release" element={<ReleasePage />} />
        <Route path="/artist/" element={<ArtistPage 
          artist='Condor44'
        />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" 
          element={<ProfilePage 
            username={userName} 
            addRelease={() => submitRelease('Condor44', 'Good Bye 44th Music', '2007', ['Ru\'s Rock', "He Goes on Rocking 'End Roll'"], [5, 4.5, 3.5, 4, 3, 4, 4], ['', '', ''])}
            addArtist={() => submitArtist('Condor44', '1998', 'Japan', ['Indie Rock'])}
            />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;