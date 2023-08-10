import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { sendShout, removeShout } from '../../functions';

const Shoutbox = (props) => {
  const urlParams = useParams();

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
      sendShout(props.currUser, urlParams.username, data.comment);
    }
  }

  const deleteShout = (e) => {
    if (e.target.className === 'shout_delete-button') {
      const message = e.currentTarget;
      const messageDate = message.querySelector('.shout_date').innerHTML;
      const messageAuthor = message.querySelector('.shout_author').innerHTML;
      const messageContent = message.querySelector('.shout_message').innerHTML;
      props.shoutbox.forEach((el, i) => {
        if (el.date === messageDate && el.from === messageAuthor && el.message === messageContent) {
          removeShout(props.currUser, i);
        }
      })
    }
  }

  const Comment = ({data}) => {
    const deleteButton = () => {
      if (props.currUser !== urlParams.username) {
        return null;
      } else {
        return (
          <button className='shout_delete-button'>delete</button>
        )
      }
    }

    return (
      <div className='shoutbox-message' onClick={(e) => deleteShout(e)}>
        <div className='shoutbox_user-info'>
          <Link className='shout_author bolded' to={`/profile/${data.from}`}>{data.from}</Link>
          <div className='shout_date greyed-info'>{data.date}</div>
        </div>
        <div className='shout_message'>{data.message}</div>
        {deleteButton()}
      </div>
    )
  }

  return (
      <div className='shoutbox'>
        <div className='shoutbox_container'>
          {
            props.shoutbox.toReversed().map((el, i) => {
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
