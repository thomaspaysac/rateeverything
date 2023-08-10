import React from 'react';

const Shoutbox = (props) => {
  return (
      <div className='shoutbox'>
        <div className='shoutbox_container' onClick={() => console.log(props)}>
        
        </div>
        <button className='shoutbox_submit'>Write a comment</button>
      </div>
  );
}

export default Shoutbox;
