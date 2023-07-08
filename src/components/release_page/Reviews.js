import React from 'react';
import { Link } from 'react-router-dom';

const Reviews = (props) => {
  return (
    <div className='release-page_reviews-component'>
      <div className="reviews-component_title">{props.reviews.length} Reviews</div>
    {
      props.reviews.map((el, i) => {
        // Obtenir l'ID de la release et de l'auteur de la review, pour retrouver le rating
        const userID = el.userID;
        let userRating;
        const ratingObject = props.ratings.find((obj) => obj.userID === userID);
        if (ratingObject) {
          userRating = ratingObject.rating;
        } else {
          userRating = '';
        }

        return (
          <div key={`review-${i}`} className='review-container'>
            <div className='review-info'>
              <div className='review_user-avatar'></div>
              <div className='review_data'>
                <div className='review_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
                <div className='review_date'>{el.date}</div>
              </div>
              <div className='review-actions'>
                <div>⇩</div>
                <div>○</div>
                <div>⇧</div>
                <div>{el.reviewScore}</div>
              </div>
              <div className='review_rating'>{userRating}</div>
            </div>
            <div className='review-content'>{el.review}</div>
          </div>
        )
      })
    }
    </div>
    
  );
}

export default Reviews;


// Review : content, auteur, date, rating, vote (= reviewScore)