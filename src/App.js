import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import { getUserInfo, submitArtist, submitRelease } from "./functions";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ReleasePage from "./components/Release";
import ArtistPage from "./components/Artist";
import SignInPage from "./components/SignIn";
import ProfilePage from "./components/Profile";
import NewArtistPage from "./components/NewArtist";
import NewReleasePage from "./components/NewRelease";
import SearchResult from "./components/SearchResult";

import './App.css';


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [userID, setUserID] = useState(undefined);
  const [userDate, setUserDate] = useState(undefined);


  // Firebase authentication
  initFirebaseAuth();

  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    if (user) { // User is signed in!
      setIsSignedIn(true);
      setUserName(getAuth().currentUser.displayName)
      setUserID(getAuth().currentUser.uid)
    } else {
      setIsSignedIn(false);
    }
  }

  // Send data to firestore
  const sendPrivateData = async () => {
    try {
      await setDoc(doc(getFirestore(), getAuth().currentUser.uid, 'ratings'), {
        displayName: getAuth().currentUser.displayName,
      });    
    }
    catch(error) {
      console.error('Error writing new task to Firebase Database', error);
    }
  }

  const Backdrop = () => {
    return (
      <div id='backdrop'>

      </div>
    )
  }
  
  return (
    <BrowserRouter>
      <Header userStatus={isSignedIn} user={userName} />
      <Backdrop />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/release/:artist/:release" element={<ReleasePage />} />
        <Route exact path="/artist/:artist" element={<ArtistPage />} />
        <Route exact path="/signin" element={<SignInPage />} />
        <Route exact path="/profile" 
          element={<ProfilePage 
            username={userName} 
            userID={userID}
            sendData={() => sendPrivateData()}
            />}
        />
        <Route exact path="/artist/add_artist" element={<NewArtistPage />} />
        <Route exact path="/artist/:artist/add_release" element={<NewReleasePage />} />
        <Route exact path="/search/:searchcategory/:searchterm" element={<SearchResult />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;