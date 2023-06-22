import React from 'react';

const PersonalRatings = (props) => {
  return (
    <div className='personalRatings-component'>
      Ratings: 0000
      <div className='ratings-listing'>
        <div className='ratings-listing_score'>
          5.0
        </div>
        <div className='ratings-listing_score'>
          4.5
        </div>
        <div className='ratings-listing_score'>
          4.0
        </div>
        <div className='ratings-listing_score'>
          3.5
        </div>
        <div className='ratings-listing_score'>
          3.0
        </div>
        <div className='ratings-listing_score'>
          2.5
        </div>
        <div className='ratings-listing_score'>
          2.0
        </div>
        <div className='ratings-listing_score'>
          1.5
        </div>
        <div className='ratings-listing_score'>
          1.0
        </div>
        <div className='ratings-listing_score'>
          0.5
        </div>
      </div>
    </div>
  );
}

export default PersonalRatings;
