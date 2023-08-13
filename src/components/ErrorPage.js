import React from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const urlParams = useParams();

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        An error occured: {urlParams.code}        
      </div>
    </div>
  );
}

export default ErrorPage;
