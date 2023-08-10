import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Shoutbox from './Shoutbox';

const SocialContainer = ({follow, userStatus, currUser}) => {
  const navigateTo = useNavigate()

  const loadNewProfile = (user) => {
    navigateTo(`/profile/${user}`);
    window.location.reload();
  }

  return (
    <div>
      <div className='profile_section-header bolded' onClick={() => console.log(userStatus, currUser)}>social</div>
      <div className='social-container'>
        <div className='social_following'>
          <h3>Following:</h3>
          <div>
          {
            follow.map((user) => {
              return (
                <div className='artificial-link' onClick={() => loadNewProfile(user)}>
                  <a href="">
                    {user}
                  </a>
                </div>
              )
            })
          }
          </div>
        </div>
        <div className='social_shoutbox'>
          <h3>Shoutbox</h3>
          <Shoutbox 
            currUser={currUser}
          />
        </div>

      </div>
    </div>
  );
}

export default SocialContainer;
