import React from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const PWForgot = () => {
  const sendForm = (e) => {
    const auth = getAuth();
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    sendPasswordResetEmail(auth, data.email);
  }

  return (
    <div className='content-page forgot-password_page'>
      <div className='content-wrapper'>
        <h2>Forgot your password?</h2>
        <div>If so, enter either your username or email address here. Your password will be reset, and sent to the e-mail that you gave us when you registered.</div>
        <form onSubmit={sendForm}>
          <div className="input-group">
            <label htmlFor="email">Email: </label>
            <input type="email" name="email"/>
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default PWForgot;
