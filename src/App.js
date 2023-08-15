import { React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { onAuthStateChanged, getAuth } from "firebase/auth";

import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import ReleasePage from "./components/Release";
import ArtistPage from "./components/Artist";
import SignInPage from "./components/SignIn";
import SignUpPage from "./components/SignUp";
import ProfilePage from "./components/Profile";
import Avatar from "./components/profile_page/Avatar";
import Recent from "./components/Recent";
import Collection from "./components/Collection";
import Wishlist from "./components/Wishlist";
import PersonalRatings from "./components/PersonalRatings";
import PersonalReviews from "./components/PersonalReviews";
import NewArtistPage from "./components/NewArtist";
import NewReleasePage from "./components/NewRelease";
import SearchResult from "./components/SearchResult";
import About from "./components/About";
import EditRelease from "./components/EditRelease";
import EditHistory from "./components/release_page/EditHistory";
import EditArtist from "./components/EditArtist";
import EditHistoryArtist from "./components/artist_page/EditHistory";
import ThanksPage from "./components/ThanksPage";
import ErrorPage from "./components/ErrorPage";
import PWForgot from "./components/PWForgot";
import UserSettings from "./components/UserSettings";
import VerifyEmail from "./components/VerifyEmail";

import './App.css';


const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(undefined);
  const [isVerified, setIsVerified] = useState(undefined);
  const [username, setUsername] = useState(undefined);
  const [userID, setUserID] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    window.ResizeObserver = null;
  }, []);

  // Firebase authentication
  initFirebaseAuth();

  function initFirebaseAuth() {
    onAuthStateChanged(getAuth(), authStateObserver);
  }

  function authStateObserver(user) {
    setTimeout(() => {
      if (user) { // User is signed in!
        setIsSignedIn(true);
        setIsVerified(getAuth().currentUser.emailVerified);
        setUsername(getAuth().currentUser.displayName);
        setUserID(getAuth().currentUser.uid);
        setEmail(getAuth().currentUser.email);
      } else {
        setIsSignedIn(false);
      }
    }, 200)
    
  }

  const Backdrop = () => {
    return (
      <div id='backdrop'></div>
    )
  }
  
  return (
    <BrowserRouter>
      <Header userStatus={isSignedIn} user={username} />
      <Backdrop />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/release/:artist/:releaseID" 
          element={<ReleasePage 
            userStatus={isSignedIn}
            username={username}
            isVerified={isVerified} />} />
        <Route exact path="/artist/:artist" 
          element={<ArtistPage
            username={username}
            userStatus={isSignedIn}
            isVerified={isVerified} />} />
        <Route exact path="/account/signin" element={<SignInPage />} />
        <Route exact path='/account/signup' element={<SignUpPage />} />
        <Route exact path='/account/forgot_password' element={<PWForgot />} />
        <Route exact path='/account/signup_confirm' element={<VerifyEmail />} />
        <Route exact path='/account/settings' element={<UserSettings email={email} isVerified={isVerified} />} />
        <Route exact path="/profile/:username" 
          element={<ProfilePage 
            username={username} 
            userID={userID}
            userStatus={isSignedIn}
            isVerified={isVerified}
            />}
        />
        <Route exact path="/profile/avatar" element={<Avatar username={username} />} />
        <Route exact path="/collection/:username/recent" element={<Recent />} />
        <Route exact path="/collection/:username/ratings/:rating" element={<PersonalRatings />} />
        <Route exact path="/collection/:username/collection" element={<Collection />} />
        <Route exact path="/collection/:username/wishlist" element={<Wishlist />} />
        <Route exact path="/collection/:username/reviews" element={<PersonalReviews />} />
        <Route exact path="/artist/add_artist" element={<NewArtistPage username={username} userStatus={isSignedIn} isVerified={isVerified} />} />
        <Route exact path="/artist/:artist/add_release" element={<NewReleasePage username={username} userStatus={isSignedIn} isVerified={isVerified} />} />
        <Route exact path="/search/:searchcategory/:searchterm" element={<SearchResult userStatus={isSignedIn} isVerified={isVerified} />} />
        <Route exact path="/releases/edit/:id" 
          element={<EditRelease
            username={username} userStatus={isSignedIn} isVerified={isVerified} />} />
        <Route exact path="/releases/history/:id" element={<EditHistory />} />
        <Route exact path="/artist/edit/:id" 
          element={<EditArtist
            username={username} userStatus={isSignedIn} isVerified={isVerified} />} />
        <Route exact path="/artist/history/:id" element={<EditHistoryArtist />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/submitted" element={<ThanksPage />} />
        <Route exact path="/error/:code" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;