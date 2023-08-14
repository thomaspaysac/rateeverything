import {React, useEffect} from 'react';
import { useParams } from 'react-router-dom';

const ErrorPage = () => {
  const urlParams = useParams();

  useEffect(() => {
    document.title = `Error - Evaluate Your Sounds`
  }, [])

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        An error occured: {urlParams.code}        
      </div>
    </div>
  );
}

export default ErrorPage;
