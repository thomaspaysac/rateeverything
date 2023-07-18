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
              <img src={lastReview[0].release.imagePath} alt="cover art" />
            </div>
          </div>
          <div className='last-review_right-col'>
            <div className='last-review_release-info'>
              <div className='last-review_release-title'>
                <Link to={`/release/${lastReview[0].release.artist}/${lastReview[0].release.releaseID}`}>{lastReview[0].release.title}</Link>
              </div>
              <div className='last-review_release-artist bolded'>
                <Link to={`/artist/${lastReview[0].release.artist}`}>{lastReview[0].release.artist}</Link>
              </div>
            </div>
            <div className='last-review_user-info'>
              <div className='greyed-text'>Review by {lastReview[0].author}</div>
              <div>{lastReview[0].rating}</div>
            </div>
            <div className='last-review_review'>
              {lastReview[0].review}
            </div>
          </div>
        </div>
        <Link to={`/collection/${urlParams.username}/reviews`} className='bolded'>all reviews...</Link>
      </div>
    )
  }
  
}
export default PersonalReviews;
