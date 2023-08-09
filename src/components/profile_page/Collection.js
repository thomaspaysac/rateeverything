import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Collection = (props) => {
  const urlParams = useParams();

  return (
    <div>
      <div className='profile_collection'>
        {props.collection.slice(-5).map((el, i) => {
          const separatedDate = el.date.split(' ');
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
    <Link to={`/collection/${urlParams.username}/collection`} className='bolded'>more...</Link>
    </div>
  );
}

export default Collection;
