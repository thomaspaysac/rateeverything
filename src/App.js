import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
} from 'firebase/firestore';

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ReleasePage from "./components/Release";
import ArtistPage from "./components/Artist";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import ProfilePage from "./components/Profile";
import NewArtistPage from "./components/NewArtist";
import NewReleasePage from "./components/NewRelease";
import SearchResult from "./components/SearchResult";
import About from "./components/About";
import EditRelease from "./components/EditRelease";
import EditHistory from "./components/release_page/EditHistory";
import EditArtist from "./components/EditArtist";
import EditHistoryArtist from "./components/artist_page/EditHistory";
import ThanksPage from "./components/ThanksPage";

import './App.css';


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [userName, setUserName] = useState(undefined);
  const [userID, setUserID] = useState(undefined);


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
        <Route exact path="/release/:artist/:releaseID" 
          element={<ReleasePage 
            userStatus={isSignedIn} />} />
        <Route exact path="/artist/:artist" 
          element={<ArtistPage
            userStatus={isSignedIn} />} />
        <Route exact path="/account/signin" element={<SignInPage />} />
        <Route exact path='/account/signup' element={<SignUpPage />} />
        <Route exact path="/profile" 
          element={<ProfilePage 
            username={userName} 
            userID={userID}
            sendData={() => sendPrivateData()}
            />}
        />
        <Route exact path="/artist/add_artist" element={<NewArtistPage />} />
        <Route exact path="/artist/:artist/add_release" 
          element={<NewReleasePage
            username={userName} />} />
        <Route exact path="/search/:searchcategory/:searchterm" element={<SearchResult />} />
        <Route exact path="/releases/edit/:id" 
          element={<EditRelease
            username={userName} />} />
        <Route exact path="/releases/history/:id" element={<EditHistory />} />
        <Route exact path="/artist/edit/:id" 
          element={<EditArtist
            username={userName} />} />
        <Route exact path="/artist/history/:id" element={<EditHistoryArtist />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/submitted" element={<ThanksPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;