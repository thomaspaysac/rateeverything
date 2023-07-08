import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { getRatingsByRelease } from '../../functions';

const UserRatingsPage = (props) => {
  return (
    <div className='release_user-ratings-list'>
      <div className="rating-component_title">Catalog</div>
      {
        props.ratings.map(el => {
          return (
            <div key={`${el.username}-rating`} className='release_user-ratings'>
              <div className='release-ratings_date'>{el.date}</div>
              <div className='release-ratings_info' id={`${el.username === props.username ? 'personal-rating' : ''}`}>
                <div className='release-ratings_avatar'></div>
                <div className='release-ratings_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
                <div className='release-rating_ratings'>{el.rating}</div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default UserRatingsPage;