import {React, useState, useEffect} from 'react';
import RecentRatings from './RecentRatings';
import PersonalReviews from './PersonalReviews';
import PersonalRatings from './PersonalRatings';
import { getByDisplayValue } from '@testing-library/react';

const ContentDisplay = ({contentDisplayed, lastRatings, userRatings, userReviews}) => {
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
          userReviews={userReviews}
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
      <button onClick={() => changeDisplay('recent')}>recent</button>
      <button onClick={() => changeDisplay('ratings')}>ratings</button>
      <button onClick={() => changeDisplay('reviews')}>reviews</button>
      <div>
        <ContentDisplay 
          contentDisplayed={contentDisplayed}
          userRatings={props.userRatings}
          userReviews={props.userReviews}
        />
      </div>
    </div>
  )
}

export default ContentContainer;
