import {React, useState, useEffect} from "react";
import { getReleaseByID, updateReleaseRating } from "../../functions";
import { getAuth } from "firebase/auth";
import "C:/Users/paysa/Documents/GitHub/rateeverything/src/App.css";

const Rating = (props) => {
  const [targetRelease, setTargetRelease] = useState();

  const updateRating = async (e) => {
    e.preventDefault();
    const user = getAuth().currentUser.displayName;
    const release = await getReleaseByID(props.releaseID);
    let rating = document.getElementById('rating').value;
    //console.log(rating, release, user);
    updateReleaseRating(release, getAuth().currentUser.displayName, getAuth().currentUser.uid, rating);
  }

  return (
    <div className="rating-component release_right-col-element">
      <div className="rating-component_title">Rate/Catalog</div>
      <div className="rating-actions">
        <div className="rating-container">
          <form onSubmit={updateRating}>
            <label htmlFor="rating">Rate:</label>
            <input type="number" name="rating" id="rating" />
            <input type="submit" />
          </form>
          
        </div>
        <div className="catalog-container">
          Catalog
        </div>
      </div>
    </div>
  )
}

export default Rating;