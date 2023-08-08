import {React, useState, useEffect} from 'react';
import DataCounter from './homepage/DataCounter';
import FeaturedReviews from './homepage/FeaturedReviews';
import LatestReleases from './homepage/LatestReleases';

import { fetchHomepageInfo } from '../functions';

import linkedinLogo from '../img/linkedin.png';
import githubLogo from '../img/github.png';
import twitterLogo from '../img/twitter.png';
import spotifyLogo from '../img/spotify.png';
import emailLogo from '../img/mail.png';



const HomePage = () => {
  const [reviews, setReviews] = useState([]);

  const fetchInfo = async () => {
    const data = await fetchHomepageInfo();
    setReviews(data[0]);
  }

  useEffect(() => {
    document.title = 'Welcome! - Evaluate Your Sounds'
    fetchInfo();
  }, [])

  return (
      <div className='content-page'>
      <div className='content-wrapper'>
        <div className='welcome_container'>
          <div className='logo-image'></div>
          <div className='welcome_message'>
            <div className='welcome_message-title'>Welcome to <span className='bolded'>Evaluate Your Sounds</span></div>
            <div className='welcome_message-description'>EYS is one of the largest music databases and communities online, which you can use in endless ways to discover new music. <span className='accent-text'>Learn about some of the ways you can use RYM for music discovery.</span></div>
          </div>
          <div className='welcome_social'>
          <a href='https://www.linkedin.com/in/thomas-paysac-5a2713254/'>
            <img src={linkedinLogo} alt='linkedIn' />
          </a>
          <a href='https://github.com/stagnant-sys'>
            <img src={githubLogo} alt='github' />
          </a>
            <img src={twitterLogo} alt='twitter' />
            <img src={spotifyLogo} alt='spotify' />
            <img src={emailLogo} alt='email' />
          </div>
        </div>
        <DataCounter />
        <div className='homepage_users-content'>
          <FeaturedReviews reviews={reviews} />
          <LatestReleases />
        </div>
      </div>
      </div>
  );
}

export default HomePage;
