import React from 'react';
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { userFirestoreSetup } from "../functions";

const SignUpPage = () => {
  firebase.initializeApp(firebaseConfig);

  const navigateTo = useNavigate();

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    if (formJson.password !== formJson.passwordCheck) {
      console.log('wrong password');
    } else if (!formJson.signupCheckbox) {
      console.log('error'); 
    } else {
      console.log(formJson);
    }
    /*createUser(formJson.email, formJson.password, formJson.username);
    navigateTo('/');*/
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

  return (
    <div className='content-page'>
      <div className="signup-page">      
        <div className="signup-container">
          <p>To begin, please create an account.</p>
          <div className='signup-warning'>⚠ That username is currently in use. Please choose another name.</div>
          <form method="post" id="signup-form" onSubmit={sendForm}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id='username' name="username" required/>
            </div>
            <div className="input-group">
              <label htmlFor="password">Enter a password:</label>
              <input type="password" id='password' name="password" minLength='4' required/>
            </div>
            <div className="input-group">
              <label htmlFor="passwordCheck">Type it again:</label>
              <input type="password" id='passwordCheck' name="passwordCheck" required/>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' name="email" required/>
            </div>
            <div>
              <label htmlFor="textarea" className='bolded'>Where did you hear about Evaluate Your Sounds?</label>
              <textarea name='textarea' id ='textarea' rows='4' cols='70' maxLength='256'></textarea>
            </div>
            <div>
              <input type='checkbox' id='signupCheckbox' name='signupCheckbox'></input>
              <label htmlFor='signupCheckbox'>I am over the age of 13 and accept the Terms of Service</label>
            </div>
            <input type="submit" value="Create Account >>" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;