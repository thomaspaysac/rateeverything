import {React, useState, useEffect} from 'react';
import StarsDisplay from '../multipage/StarsDisplay';
import { Link, useParams } from 'react-router-dom';

const individualRating = (rating, array, totalLength, username) => {
  if (array) {
    const blockWidth = (array.length / totalLength) * 100;
    return (
      <div className='individual-rating_row'>
        <div className='individual-rating_score'>
          <div className='bolded'><Link to={`/collection/${username}/ratings/${rating}`}>{rating}</Link></div>
          <div className='rating_stars-display'><StarsDisplay rating={rating} /></div>
        </div>
        <div className='ratings-number bolded'>{array.length}</div>
        <div className='ratings_percentage'>
          <div className='ratings_percentage-block' style={{width: `${blockWidth}%`,}}></div>
        </div>
      </div>
    )
  }
}

const PersonalRatings = (props) => {
  const urlParams = useParams();

  useEffect(() => {
    document.title = `${urlParams.username}'s music - Evaluate Your Sounds`
  }, [])

  return (
    <div className='personal-ratings-component'>
      <div className='bolded personal-ratings-component_title'>Ratings: <Link to={`/collection/${urlParams.username}/ratings/all`}>{props.userRatings.length}</Link></div>
      <div className='ratings-listing'>
        <div className='ratings-listing_item'>
          {individualRating('5.0', props.ratingsByScore[9], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('4.5', props.ratingsByScore[8], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('4.0', props.ratingsByScore[7], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('3.5', props.ratingsByScore[6], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('3.0', props.ratingsByScore[5], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('2.5', props.ratingsByScore[4], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('2.0', props.ratingsByScore[3], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('1.5', props.ratingsByScore[2], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('1.0', props.ratingsByScore[1], props.userRatings.length, urlParams.username)}
        </div>
        <div className='ratings-listing_item'>
          {individualRating('0.5', props.ratingsByScore[0], props.userRatings.length, urlParams.username)}
        </div>
      </div>
    </div>
  );
}

export default PersonalRatings;
