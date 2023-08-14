import { React, useEffect } from 'react';
import { getAuth, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';


const UserSettings = ({ email, isVerified }) => {
  const auth =  getAuth();
  const notification = document.querySelector('.email-notification');

  useEffect(() => {
    document.title = `Settings - Evaluate Your Sounds`
  }, [])

  const resetPassword = () => {
    if(window.confirm('Are you sure you want to reset your password?')) {
      sendPasswordResetEmail(auth, email);
      notification.style.display = 'block';
    }
  }

  const sendLink = () => {
    sendEmailVerification(auth.currentUser);
    notification.style.display = 'block';
  }

  const VerificationButton = () => {
    if (isVerified) {
      return null;
    } else {
      return (
        <button onClick={sendLink}>Send verification link to {email}</button>
      )
    }
  }

  return (
    <div className='content-page settings-page'>
      <div className='content-wrapper'>
        <h2>Account settings</h2>
        <div className='user-actions'>
          <button onClick={resetPassword}>Reset your password</button>
          <VerificationButton />
        </div>
        <div className='warning email-notification'>
          An email has been sent to <span className='bolded'>{email}</span>
        </div>
      </div>
    </div>
    );
}

export default UserSettings;
