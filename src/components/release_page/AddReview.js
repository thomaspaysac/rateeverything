import React from 'react';
import { getAuth } from "firebase/auth";
import { sendReview, getReleaseByID } from '../../functions';

const AddReview = (props) => {
  const addNewReview = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const release = await getReleaseByID(props.releaseID);
    console.log(data.reviewText);
    sendReview(release, getAuth().currentUser.displayName, getAuth().currentUser.displayName, data.reviewText);
  }

  return (
    <div className='review-form'>
      <h3>Review</h3>
      <div className='disclaimer greyed-text'>
        All reviews must meet the following standards:
        <ul>
          <li className='greyed-text'>adherent to the <span className='fake-link'>terms of service</span></li>
          <li className='greyed-text'>adherent to the <span className='fake-link'>community rules</span>, and not condoning any sort of violence or hatred toward the artist</li>
          <li className='greyed-text'>written in <span className='bolded'>your own words</span> (copying text from another site will lead to permanent suspension of your account).</li>
        </ul>
      </div>
      <form onSubmit={addNewReview}>
        <textarea name="reviewText"></textarea>
        <input type='submit' value='Send review' />
      </form>
    </div>
  );
}

export default AddReview;
