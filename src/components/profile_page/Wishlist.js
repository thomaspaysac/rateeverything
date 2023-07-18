import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Wishlist = (props) => {
  const urlParams = useParams();

  return (
    <div>
      <div className='profile_collection'>
        {props.wishlist.slice(-5).map((el, i) => {
          return (
            <div key={`collection-${i}`} className="profile_collection-item">
              <div className='recent-rating_thumbnail'>
                <img src={el.release.imagePath} alt="cover art" />
              </div>
              <div className='recent-rating_date bolded'>{el.date}</div>
              <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                &nbsp; - &nbsp;
              <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link></div>
            </div>
          )
        } )}
      </div>
    <Link to={`/collection/${urlParams.username}/wishlist`} className='bolded'>more...</Link>
    </div>
  );
}

export default Wishlist;
