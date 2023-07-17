import {React, useEffect} from 'react';

const ThanksPage = () => {
  useEffect(() => {
    document.title = 'Thank you! - Evaluate Your Sounds'
  })

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        <h2 className="bolded">Thank you for your contribution!</h2>
      </div>
    </div>
  );
}

export default ThanksPage;
