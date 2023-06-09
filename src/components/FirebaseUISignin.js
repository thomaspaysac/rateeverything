import React, { useState, useEffect } from 'react';
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
import firebase from "firebase/compat/app";

import "../App.css";
import { firebaseConfig } from '../firebase';


const FirebaseUISignInPage = (props) => {
  firebase.initializeApp(firebaseConfig);

  useEffect(() => {
    const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
    ui.start(".firebaseui-auth-container", {
      signInOptions: [
        {        
          provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
        }       
      ],
      signInSuccessUrl: "/signedin"
    })
  }, [])

  const [isSignedIn, setIsSignedIn] = useState(false);

  const SignInInvite = () => {
    if (isSignedIn === undefined || !isSignedIn) {
      return (
        <div>Not signed in</div>
      )
    } else {
      return (
        <div>Signed in!</div>
      )
    }
  }

  return (
    <div>
      <div>Sign in page</div>
      <SignInInvite />

      <div className="firebaseui-auth-container"></div>
    </div>
  )
}

export default FirebaseUISignInPage;