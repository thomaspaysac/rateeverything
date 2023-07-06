import {React, useState, useEffect} from 'react';
import { getRatingsByRelease } from '../../functions';

const UserRatingsPage = (props) => {
  const fetchRatings = async () => {
  }

  useEffect(() => {
    fetchRatings();
  }, [])

  return (
    <div className='release_user-ratings-list'>
      <div className="rating-component_title">Catalog</div>
      {
        props.ratings.map(el => {
          return (
            <div key={`${el.username}-rating`} className='release_user-ratings'>
              <div className='release-ratings_date'>{el.date}</div>
              <div className='release-ratings_info'>
                <div className='release-ratings_username'>{el.username}</div>
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