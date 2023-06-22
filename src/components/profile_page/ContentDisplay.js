import {React, useState, useEffect} from 'react';
import PersonalRatings from './PersonalRatings';
import { getByDisplayValue } from '@testing-library/react';

const ContentDisplay = ({contentDisplayed, userRatings}) => {
  if (contentDisplayed === 'ratings') {
    return (
      <PersonalRatings 
        userRatings={userRatings}
      />
    );
  } else {
    return null
  }
}

const ContentContainer = (props) => {
  const [contentDisplayed, setContentDisplayed] = useState('ratings');

  const changeDisplay = (content) => {
    setContentDisplayed(content);
    console.log(contentDisplayed)
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
        />
      </div>
    </div>
  )
}

export default ContentContainer;
