import React from 'react';

const SocialContainer = ({follow}) => {
  return (
    <div>
      <div className='profile_section-header bolded'>social</div>
      <div className='social-container'>
        <div className='social_following' onClick={() => console.log(follow)}>
          Following:
          {
            follow.map((user) => {
              return (
                <div>{user}</div>
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
