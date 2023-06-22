import React from 'react';
import { Link } from 'react-router-dom';

const PersonalReviews = (props) => {
  return (
    <div>
      {
        props.userReviews.map((el) => {
          return (
            <div className="personal-review_container">
              <div>(O)</div>
              <div>{el.date}</div>
              <div>{el.rating}</div>
              <div><Link to={`/artist/${el.release.artist}`}>{el.release.artist}</Link>
                - 
              <Link to={`/release/${el.release.artist}/${el.release.release}`}>{el.release.release}</Link></div>
              <div>(personal tags)</div>
            </div>
          )
        })
      }
    </div>
  );
}

export default PersonalReviews;
