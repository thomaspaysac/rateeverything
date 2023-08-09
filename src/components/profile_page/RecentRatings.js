import React from 'react';
import { Link, useParams } from 'react-router-dom';
import StarsDisplay from '../multipage/StarsDisplay';

const RecentRatings = (props) => {
  const urlParams = useParams();


  return (
    <div>
      <div className='recent-ratings'>
        {props.userRatings.slice(-5).map((el, i) => {
          const separatedDate = el.date.split(' ');
          return (
            <div key={`recent-${i}`} className="recent-rating_item">
              <div className='recent-rating_thumbnail'>
                <img src={el.release.imagePath} alt="cover art" />
              </div>
              <div className='recent-rating_date bolded'>
                <div>{separatedDate[0]}</div> 
                <div>{separatedDate[1]}</div> 
                <div>{separatedDate[2]}</div>
              </div>
              <div className='rating_stars-display'><StarsDisplay key={`rating-${i}`} rating={el.rating} /></div>
              <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                &nbsp; - &nbsp;
              <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link> <span className='lists_date'>&nbsp;({el.release.year})</span></div>
            </div>
          )
        } )}
      </div>
    <Link to={`/collection/${urlParams.username}/recent`} className='bolded'>more...</Link>
    </div>
  );
}

export default RecentRatings;
