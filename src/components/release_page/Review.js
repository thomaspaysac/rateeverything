import React from 'react';

const Review = () => {
  return (
    <div className='release-page_reviews-component'>
      <div className='review-container'>
        <div className='review-info'>
          <div className='review_user-avatar'>O</div>
          <div className='review_data'>
            <div className='review_username'>Username</div>
            <div className='review_date'>date</div>
          </div>
          <div className='review-actions'>
            <div>⇩</div>
            <div>○</div>
            <div>⇧</div>
            <div>0</div>
          </div>
          <div className='review_rating'>rating</div>
        </div>
        <div className='review-content'>Review content</div>
      </div>
    </div>
    
  );
}

export default Review;


// Review : content, auteur, date, rating, vote (= reviewScore)