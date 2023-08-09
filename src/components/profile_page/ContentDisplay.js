import {React, useState, useEffect} from 'react';
import RecentRatings from './RecentRatings';
import PersonalReviews from './PersonalReviews';
import PersonalRatings from './PersonalRatings';
import Collection from './Collection';
import Wishlist from './Wishlist';

const ContentDisplay = ({contentDisplayed, lastRatings, userRatings, ratingsByScore, lastReview, reviews, collection, wishlist}) => {
  switch (contentDisplayed) {
    case 'recent':
      return (
        <RecentRatings 
          userRatings={userRatings}
        />
      );
    case 'ratings':
      return (
        <PersonalRatings
          userRatings={userRatings}
          ratingsByScore={ratingsByScore}
        />
      );
    case 'reviews':
      return (
        <PersonalReviews
          lastReview={lastReview}
          reviews={reviews}
        />
      );
    case 'collection':
      return (
        <Collection
          collection={collection}
        />
      );
    case 'wishlist':
      return (
        <Wishlist
          wishlist={wishlist}
        />
      );
    default:
      throw new Error('Wrong paramater');
  }
}

const ContentContainer = (props) => {
  const [contentDisplayed, setContentDisplayed] = useState('recent');

  const changeDisplay = (content) => {
    setContentDisplayed(content);
  }

  return (
    <div>
      <div className='profile_section-header bolded'>music</div>
      <div className="profile_music-section">
        <div className="profile_display-buttons">
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'recent' ? 'active-button' : ''}
            onClick={() => changeDisplay('recent')}>recent</button>
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'ratings' ? 'active-button' : ''}
            onClick={() => changeDisplay('ratings')}>ratings [{props.userRatings.length}]</button>
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'reviews' ? 'active-button' : ''}
            onClick={() => changeDisplay('reviews')}>reviews [{props.reviews.length}]</button>
            <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'collection' ? 'active-button' : ''}
            onClick={() => changeDisplay('collection')}>collection [{props.collection.length}]</button>
            <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'wishlist' ? 'active-button' : ''}
            onClick={() => changeDisplay('wishlist')}>wishlist [{props.wishlist.length}]</button>
        </div>
        <div className='profile_content-container'>
          <ContentDisplay
            contentDisplayed={contentDisplayed}
            userRatings={props.userRatings}
            lastReview={props.lastReview}
            collection={props.collection}
            wishlist={props.wishlist}
            reviews={props.reviews}
            ratingsByScore={props.ratingsByScore}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentContainer;
