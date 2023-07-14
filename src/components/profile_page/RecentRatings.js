import React from 'react';
import { Link } from 'react-router-dom';
import StarsDisplay from '../multipage/StarsDisplay';

const RecentRatings = (props) => {
  return (
    <div>
    {props.userRatings.slice(-5).map((el) => {
      return (
        <div className="recent-rating_container">
          <div className='recent-rating_thumbnail'>
            <img src={el.release.imagePath} alt="cover art" />
          </div>
          <div className='recent-rating_date bolded'>{el.date}</div>
          <div className='rating_stars-display'><StarsDisplay rating={el.rating} /></div>
          <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
            &nbsp; - &nbsp; 
           <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link></div>
          <div onClick={() => console.log(el)}>(personal tags)</div>
        </div>
      )
    } )}
    More...
    </div>
  );
}

export default RecentRatings;
