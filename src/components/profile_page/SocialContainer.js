import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Shoutbox from './Shoutbox';

const SocialContainer = ({follow, userStatus, currUser, shoutbox, isVerified}) => {
  const navigateTo = useNavigate()

  const loadNewProfile = (user) => {
    navigateTo(`/profile/${user}`);
    window.location.reload();
  }
  if (!userStatus) {
    return (
      <div>
        <div className='profile_section-header bolded'>social</div>
          <div className='social-container'>
            <h3><Link to='/account/signin'>Log in</Link> to see this section</h3>
          </div>
      </div>
    )
  }
  if (!isVerified) {
    return (
      <div>
        <div className='profile_section-header bolded'>social</div>
          <div className='social-container'>
            <h3>Verify your email to see this section</h3>
           </div>
      </div>
    )
  } else return (
    <div>
      <div className='profile_section-header bolded'>social</div>
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
            shoutbox={shoutbox}
          />
        </div>

      </div>
    </div>
  );
}

export default SocialContainer;
