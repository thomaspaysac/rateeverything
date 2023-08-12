import {React, useEffect} from "react";
import { useNavigate, Link } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { userFirestoreSetup } from "../functions";

import "../App.css"

const SignInPage = () => {
  firebase.initializeApp(firebaseConfig);

  const navigateTo = useNavigate();

  useEffect(() => {
    document.title = 'Log In - Evaluate Your Sounds'
  })

  const signIn = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, formJson.email, formJson.password)
    .then((userCredential) => {
      const user = userCredential.user;
      navigateTo('/');
    })
    .catch((error) => {
      const warning = document.querySelector('.signin-warning');
      warning.style.display = 'block';
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }


  return (
    <div className="content-page">
      <div className="login-page">
        <div className="login-section">
          <h2 className="login-page_title">Log in</h2>
          <p>If you are already registered, then please log in.</p>
          <div className="login-container">
            <form method="post" id="signin-form" onSubmit={signIn}>
              <div className="input-group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email"/>
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input type="password" name="password"/>
              </div>
            </form>
            <div className='signin-warning'>Invalid username or password.</div>
          </div>
          <input type="submit" form="signin-form" value="Log in >>" />
        </div>
        

        <div className="signup-section">
          <h3 className="login-page_signup-prompt">Don't have an account?</h3>
          <p>With an Evaluate Your Sounds account, you can:</p>
          <ul>
            <li><span className="bolded">rate, review, catalog, and tag</span> your music</li>
            <li>create and publish <span className="bolded">lists</span> of your favorite things</li>
            <li><span className="bolded">research</span> music, cross-referenced by artist, and genre.</li>
            <li><span className="bolded">contribute</span> to an always-growing public music database</li>
          </ul>
          <Link to='/account/signup'><div className="login-page_signup-button">
            Sign up now!
          </div></Link>
        </div>
      </div>
    </div>
  )
}

export default SignInPage;