import React from 'react';
import { Link } from 'react-router-dom';

const RecentRatings = (props) => {
  return (
    <div>
    {props.userRatings.slice(-5).map((el) => {
      return (
        <div className="personal-rating_container">
          <div>(O)</div>
          <div>{el.date}</div>
          <div>{el.rating}</div>
          <div><Link to={`/artist/${el.release.artist}`}>{el.release.artist}</Link>
             - 
           <Link to={`/release/${el.release.artist}/${el.release.release}`}>{el.release.release}</Link></div>
          <div>(personal tags)</div>
        </div>
      )
    } )}
    More...
    </div>
  );
}

export default RecentRatings;
