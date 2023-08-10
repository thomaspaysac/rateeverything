import {React, useState, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { userFirestoreSetup, getAllUsernames } from "../functions";

const SignUpPage = () => {
  const [usernamesList, setUsernamesList] = useState([]);

  const loadUsersList = async () => {
    const list = await getAllUsernames();
    setUsernamesList(list);
  }

  useEffect(() => {
    document.title = 'Sign Up! - Evaluate Your Sounds'
    loadUsersList();
  }, [])

  firebase.initializeApp(firebaseConfig);



  const navigateTo = useNavigate();

  const validateInput = (e) => {
    const warningMessages = document.querySelectorAll('.signup-warning');
    const warningUsernameTaken = document.getElementById('username-taken');
    const warningUsernameInvalid = document.getElementById('username-invalid');
    const warningPasswordMatchFailed = document.getElementById('password-falsematch');
    const warningEmailFormat = document.getElementById('email-invalid');
    const warningTOS = document.getElementById('tos-unchecked');
    const usernameRegex= new RegExp('^[a-zA-Z0-9_]*$');
    // Reset warning messages
    warningMessages.forEach(el => el.style.display = 'none');
    // Get form data
    e.preventDefault();
    const formData = new FormData(e.target);
    const formJson = Object.fromEntries(formData.entries());
    // Check data and display warnings as needed
    if (!usernameRegex.test(formJson.username)) {
      warningUsernameInvalid.style.display = 'block';
    } else if (usernamesList.includes(formJson.username)) {
      warningUsernameTaken.style.display = 'block';
    } 
    if (formJson.password !== formJson.passwordCheck) {
      warningPasswordMatchFailed.style.display = 'block';
    }
    if (!formJson.signupCheckbox) {
      warningTOS.style.display = 'block';
    } else {
      sendForm(formJson)
    }
  }

  const sendForm = (data) => {
    createUser(data.email, data.password, data.username);
    navigateTo('/');
  }

  const createUser = (email, password, displayName) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      updateProfile(auth.currentUser, { displayName: displayName })
      .then(userFirestoreSetup(displayName, email))
      .then(window.location.reload())
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
          <div className='signup-warning' id='username-taken'>⚠ That username is currently in use. Please choose another name.</div>
          <div className='signup-warning' id='username-invalid'>⚠ Your username must only consist of letters, numbers, and '_'.</div>
          <div className='signup-warning' id='password-falsematch'>⚠ The passwords you typed don't match. Please type them again.</div>
          <div className='signup-warning' id='email-invalid'>⚠ Your e-mail is not in a valid format. It should be in the format "user@domain.com".</div>
          <div className='signup-warning' id='tos-unchecked'>⚠ Please accept the terms of service.</div>

          

          <form method="post" id="signup-form" onSubmit={validateInput}>
            <div className="input-group">
              <label htmlFor="username">Username:</label>
              <input type="text" id='username' name="username" aria-required="true" />
            </div>
            <div className="input-group">
              <label htmlFor="password">Enter a password:</label>
              <input type="password" id='password' name="password" minLength='4' aria-required="true"/>
            </div>
            <div className="input-group">
              <label htmlFor="passwordCheck">Type it again:</label>
              <input type="password" id='passwordCheck' name="passwordCheck" aria-required="true"/>
            </div>
            <div className="input-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id='email' name="email" required />
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