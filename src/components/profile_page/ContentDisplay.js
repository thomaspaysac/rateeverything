import {React, useState, useEffect} from 'react';
import RecentRatings from './RecentRatings';
import PersonalReviews from './PersonalReviews';
import PersonalRatings from './PersonalRatings';
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
      )
    case 'reviews':
      return (
        <PersonalReviews
          lastReview={lastReview}
        />
      )
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
      <button className='profile_music_display-button bolded' 
        id={contentDisplayed === 'recent' ? 'active-button' : ''} 
        onClick={() => changeDisplay('recent')}>recent</button>
      <button className='profile_music_display-button bolded' 
        id={contentDisplayed === 'ratings' ? 'active-button' : ''} 
        onClick={() => changeDisplay('ratings')}>ratings</button>
      <button className='profile_music_display-button bolded' 
        id={contentDisplayed === 'reviews' ? 'active-button' : ''} 
        onClick={() => changeDisplay('reviews')}>reviews</button>
      <div>
        <ContentDisplay 
          contentDisplayed={contentDisplayed}
          userRatings={props.userRatings}
          lastReview={props.lastReview}
        />
      </div>
    </div>
  )
}

export default ContentContainer;
