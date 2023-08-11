import React from 'react';
import { useParams, Link } from 'react-router-dom';
import format from 'date-fns/format';

const Wishlist = (props) => {
  const urlParams = useParams();

  return (
    <div>
      <div className='profile_collection'>
        {props.wishlist.slice(-5).map((el, i) => {
          const separatedDate = format(el.date, 'dd MMM yyyy').split(' ');
          return (
            <div key={`collection-${i}`} className="profile_collection-item">
              <div className='recent-rating_thumbnail'>
                <img src={el.release.imagePath} alt="cover art" />
              </div>
              <div className='recent-rating_date bolded'>
                <div>{separatedDate[0]}</div> 
                <div>{separatedDate[1]}</div> 
                <div>{separatedDate[2]}</div>
              </div>
              <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                &nbsp; - &nbsp;
              <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link> <span className='lists_date'>&nbsp;({el.release.year})</span></div>
            </div>
          )
        } )}
      </div>
    <Link to={`/collection/${urlParams.username}/wishlist`} className='bolded'>more...</Link>
    </div>
  );
}

export default Wishlist;
