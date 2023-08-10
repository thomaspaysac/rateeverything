import React from 'react';
import format from 'date-fns/toDate';

const Shoutbox = (props) => {
  const Comment = ({data}) => {
    const cleanDate = new Date((data.date.seconds)*1000).toISOString();

    return (
      <div className='shoutbox-message'>
        <div className='shoutbox_user-info'>
          <div className='shout_author'>{data.user}</div>
          <div className='shout_date'>{}</div>
        </div>
        <div className='shout_message'>{data.message}</div>
      </div>
    )
  }

  const writeComment = () => {
    const button = document.querySelector('.shoutbox_write-button');
    const writer = document.querySelector('.shoutbox_write-container');
    button.style.display = 'none';
    writer.style.display = 'flex';
  }

  return (
      <div className='shoutbox'>
        <div className='shoutbox_container'>
          {
            props.shoutbox.map((el, i) => {
              return (
                <Comment key={`shout-${i}`} data={el} />
              )
            })
          }
        </div>
        <button onClick={writeComment} className='shoutbox_write-button'>Write a comment</button>
        <div className='shoutbox_write-container'>
          <textarea maxLength={500}></textarea>
          <button> > </button>
        </div>
      </div>
  );
}

export default Shoutbox;
