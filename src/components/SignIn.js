import React from "react";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { userFirestoreSetup } from "../functions";

import "../App.css"

const SignInPage = () => {
  firebase.initializeApp(firebaseConfig);

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    createUser(formJson.email, formJson.password, formJson.username);
  }

  const createUser = (email, password, displayName) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: displayName })
      .then(userFirestoreSetup(auth.currentUser.uid, displayName))
      .catch((error) => console.log(error));
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  const signIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formJson.email, formJson.password)
    .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }

  const testfunc = () => {
    console.log(getAuth().currentUser);
  }


  return (
    <div>
      <div className="signup-container">
        Sign up
        <form method="post" id="signup-form" onSubmit={sendForm}>
          <div className="input-group">
            <label htmlFor="username">Username:</label>
            <input type="text" name="username"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password"/>
          </div>
          <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email"/>
          </div>
          <input type="submit" value="Sign up" />
        </form>
      </div>

      <div className="signin-container">
        Sign in
        <form method="post" id="signin-form" onSubmit={signIn}>
        <div className="input-group">
            <label htmlFor="email">Email:</label>
            <input type="email" name="email"/>
          </div>
          <div className="input-group">
            <label htmlFor="password">Password:</label>
            <input type="password" name="password"/>
          </div>
          <input type="submit" value="Sign in" />
        </form>
      </div>
      <button onClick={() => signOut(getAuth())}>Sign Out</button>
      <button onClick={() => testfunc()}>Test</button>
    </div>
  )
}

export default SignInPage;