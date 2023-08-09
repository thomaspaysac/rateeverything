import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../functions';
import StarsDisplay from '../multipage/StarsDisplay';

const Reviews = (props) => {
  const Avatar = ({user}) => {
    const [avatar, setAvatar] = useState();    

    const fetchAvatar = async (user) => {
      const data = await getUserInfo(user);
      setAvatar(data.avatar.link);
    }

    useEffect(() => {
      fetchAvatar(user)
    }, [])

    if (!avatar || avatar === '') {
      return null;
    } else {
      return (
        <img src={avatar} alt='user avatar' onClick={() => console.log(user)}/>
      )
    }
  }

  return (
    <div className='release-page_reviews-component'>
      <div className="reviews-component_title">{props.reviews.length} Reviews</div>
    {
      props.reviews.map((el, i) => {
        const user = el.username;
        let userRating = '';
        props.ratings.forEach(el => {
          if (el.username === user) {
            userRating = el.rating.toFixed(1);
          }
        })

        return (
          <div key={`review-${i}`} className='review-container'>
            <div className='review-info'>
              <div className='review_user-avatar'><Avatar user={el.username}/></div>
              <div className='review_data'>
                <div className='review_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
                <div className='review_date'>{el.date}</div>
              </div>
              <div className='review-actions'>
                <div>⇩</div>
                <div>○</div>
                <div>⇧</div>
                <div>{el.reviewScore}</div>
              </div>
              <div className='rating_stars-display'>
                <StarsDisplay key='user-rating' rating={userRating} />
              </div>
            </div>
            <div className='review-content'>{el.review}</div>
          </div>
        )
      })
    }
    </div>
    
  );
}

export default Reviews;