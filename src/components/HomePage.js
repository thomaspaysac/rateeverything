import {React, useState, useEffect} from 'react';
import { getCollLength, getAllReleasesLength } from '../functions';

import linkedinLogo from '../img/linkedin.png';
import githubLogo from '../img/github.png';
import twitterLogo from '../img/twitter.png';
import spotifyLogo from '../img/spotify.png';
import emailLogo from '../img/mail.png';

const HomePage = () => {
  const [dataCounter, setDataCounter] = useState();

  const loadDataCounter = async () => {
    const artists = await getCollLength();
    const releases = await getAllReleasesLength();
    const data = {
      artists: artists,
      releases: releases,
    }
    setDataCounter(data);
  }

  useEffect(() => {
    loadDataCounter();
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
        <div className='data-counter_container' onClick={() => console.log(dataCounter)}>
          <div className='bolded'><span className='greyed-text'>{dataCounter.artists}</span> Artists</div>
          <div className='bolded'><span className='greyed-text'>{dataCounter.releases}</span> Releases</div>
          <div className='bolded'><span className='greyed-text'>X</span> Ratings</div>
          <div className='bolded'><span className='greyed-text'>X</span> Reviews</div>
          <div className='bolded'><span className='greyed-text'>X</span> Lists</div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
