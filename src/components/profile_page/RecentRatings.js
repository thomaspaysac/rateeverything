import React from 'react';
import { Link } from 'react-router-dom';

const RecentRatings = (props) => {
  return (
    <div>
    {props.userRatings.slice(-5).map((el) => {
      return (
        <div className="recent-rating_container">
          <div className='art_thumbnail_container'>
            <img className='art_thumbnail' src={el.release.imagePath} alt="cover art" />
          </div>
          <div>{el.date}</div>
          <div>{el.rating}</div>
          <div><Link to={`/artist/${el.release.artist}`}>{el.release.artist}</Link>
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
