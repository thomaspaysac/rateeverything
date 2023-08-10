import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sendShout } from '../../functions';

const Shoutbox = (props) => {
  const urlParams = useParams();

  const Comment = ({data}) => {
    //const cleanDate = new Date((data.date.seconds)*1000).toISOString();

    return (
      <div className='shoutbox-message'>
        <div className='shoutbox_user-info'>
          <div className='shout_author bolded'><Link to={`/profile/${data.from}`}>{data.from}</Link></div>
          <div className='shout_date greyed-info'>{data.date}</div>
        </div>
        <div className='shout_message'>{data.message}</div>
        <button className='shout_delete-button'>delete</button>
      </div>
    )
  }

  const writeComment = () => {
    const button = document.querySelector('.shoutbox_write-button');
    const writer = document.querySelector('.shoutbox_write-container');
    button.style.display = 'none';
    writer.style.display = 'flex';
  }

  const submitShout = async (e) => {
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data !== '') {
      sendShout(props.currUser, urlParams.username, data.comment)
    }
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
          <form className='shoutbox_write-container' onSubmit={submitShout}>
            <textarea name="comment" maxLength="500" rows="3"></textarea>
            <input type='submit' value='>' />
          </form>
      </div>
  );
}

export default Shoutbox;
