import {React, useState, useEffect} from 'react';
import RecentRatings from './RecentRatings';
import PersonalReviews from './PersonalReviews';
import PersonalRatings from './PersonalRatings';
import Collection from './Collection';
import Wishlist from './Wishlist';
import { getByDisplayValue } from '@testing-library/react';

const ContentDisplay = ({contentDisplayed, lastRatings, userRatings, lastReview}) => {
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
        />
      );
    case 'reviews':
      return (
        <PersonalReviews
          lastReview={lastReview}
        />
      );
    case 'collection':
      return (
        <Collection
        />
      );
    case 'wishlist':
      return (
        <Wishlist
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
      <div class="profile_music-section">
        <div class="profile_display-buttons">
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'recent' ? 'active-button' : ''}
            onClick={() => changeDisplay('recent')}>recent</button>
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'ratings' ? 'active-button' : ''}
            onClick={() => changeDisplay('ratings')}>ratings</button>
          <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'reviews' ? 'active-button' : ''}
            onClick={() => changeDisplay('reviews')}>reviews</button>
            <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'collection' ? 'active-button' : ''}
            onClick={() => changeDisplay('collection')}>collection</button>
            <button className='profile_music_display-button bolded'
            id={contentDisplayed === 'wishlist' ? 'active-button' : ''}
            onClick={() => changeDisplay('wishlist')}>wishlist</button>
        </div>
        <div className='profile_content-container'>
          <ContentDisplay
            contentDisplayed={contentDisplayed}
            userRatings={props.userRatings}
            lastReview={props.lastReview}
          />
        </div>
      </div>
    </div>
  )
}

export default ContentContainer;
