import React from 'react';
import { Link } from 'react-router-dom';

const List = ({item}) => {
  if (!item) {
    return null
  } else {
    return (
      <div>
        <div className="latest-reviews_container">
          <div className='last-review_left-col'>
            <div className='last-review_art'>
              <img src={item.imagePath} alt="cover art" />
            </div>
          </div>
          <div className='last-review_right-col'>
            <div className='last-review_release-info'>
              <div className='last-review_release-title'>
                <Link to={`/release/${item.artist}/${item.albumID}`}>{item.release}</Link> <span className='last-review_date'>({item.releaseDate})</span>
              </div>
              <div className='last-review_release-artist bolded'>
                <Link to={`/artist/${item.artist}`}>{item.artist}</Link>
              </div>
            </div>
            <div className='last-review_user-info'>
              <div className='greyed-text'>Review by <Link to={`/profile/${item.username}`}>{item.username}</Link></div>
            </div>
            <div className='last-review_review'>
              {item.review}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const FeaturedReviews = ({reviews}) => {
  return (
    <div>
      <h2 className='homepage_section-header'>Latest reviews</h2>
      <div>
        {
          reviews.map((el) => {
          return (
            <List item={el}   />
          )
        })
        }
      </div>
    </div>
  );
}

export default FeaturedReviews;
