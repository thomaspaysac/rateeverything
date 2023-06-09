import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import Header from "./components/Header";
import ReleasePage from "./components/Release";
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

  return (
    <BrowserRouter>
      <Header userStatus={isSignedIn} user={userName} />
      <Routes>
        <Route path="/release" element={<ReleasePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/profile" element={<ProfilePage username={userName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;