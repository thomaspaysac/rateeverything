import React from 'react';
import { Link, useParams } from 'react-router-dom';

const PersonalReviews = ({lastReview}) => {
  const urlParams = useParams();

  if (!lastReview || lastReview.length === 0) {
    return null;
  } else {
    return (
      <div>
        <div className="last-review_container">
          <div className='last-review_left-col'>
            <div className='last-review_art'>
              <img src={lastReview.release.imagePath} alt="cover art" />
            </div>
          </div>
          <div className='last-review_right-col'>
            <div className='last-review_release-info'>
              <div className='last-review_release-title'>
                <Link to={`/release/${lastReview.release.artist}/${lastReview.release.releaseID}`}>{lastReview.release.title}</Link> <span className='last-review_date'>({lastReview.release.year})</span>
              </div>
              <div className='last-review_release-artist bolded'>
                <Link to={`/artist/${lastReview.release.artist}`}>{lastReview.release.artist}</Link>
              </div>
            </div>
            <div className='last-review_user-info'>
              <div className='greyed-text'>Review by <Link to={`/profile/${lastReview.author}`}>{lastReview.author}</Link></div>
              <div>{lastReview.rating}</div>
            </div>
            <div className='last-review_review'>
              {lastReview.review}
            </div>
          </div>
        </div>
        <Link to={`/collection/${urlParams.username}/reviews`} className='bolded'>more...</Link>
      </div>
    )
  }
  
}
export default PersonalReviews;
