import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../functions';

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

  const starDisplay = (rating) => {
    const dividedRating = rating / 0.5;
    const ratingArray = Array(dividedRating).fill(0.5);
    const emptyStars = Array(10 - dividedRating).fill(null);
    ratingArray.push(...emptyStars);
    console.log(ratingArray);
    //Compléter array jusqu'à 5 étoiles, attribuer une valeur ('null') puis si el === null, attribuer étoile grise
    if (rating) {
      return (
        ratingArray.map((el, i) => {
          if (i % 2 === 0 && el) {
            return <svg data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg"><g fill="#C69C4F"><path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" /></g></svg>;
          } else if (i % 2 !== 0 && el) {
            return <svg data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg"><g fill='#C69C4F'><path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/></g></svg>;
          } else if (i % 2 === 0 && !el) {
            return <svg data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg"><g fill="#8c8d90"><path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" /></g></svg>;
          } else {
            return <svg data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg"><g fill='#8c8d90'><path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/></g></svg>;
          }
        })
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
              <div className='review_rating'>
                {starDisplay(userRating)}
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