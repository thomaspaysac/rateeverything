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
    <div>
      <form onSubmit={addNewReview}>
        <textarea name="reviewText"></textarea>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
}

export default AddReview;
