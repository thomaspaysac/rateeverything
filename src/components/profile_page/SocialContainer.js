import React from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const SocialContainer = ({follow}) => {
  const navigateTo = useNavigate()

  const loadNewProfile = (user) => {
    navigateTo(`/profile/${user}`);
    window.location.reload();
  }

  return (
    <div>
      <div className='profile_section-header bolded'>social</div>
      <div className='social-container'>
        <div className='social_following' onClick={() => console.log(follow)}>
          Following:
          {
            follow.map((user) => {
              return (
                <a href="">
                  <div className='artificial-link' onClick={() => loadNewProfile(user)}>{user}</div>
                </a>
              )
            })
          }
        </div>
        <div className='social_shoutbox'>
          <h3>Shoutbox</h3>
        </div>

      </div>
    </div>
  );
}

export default SocialContainer;
