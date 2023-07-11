import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../functions';

const UserRatingsPage = (props) => {
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
    <div className='release_user-ratings-list'>
      <div className="rating-component_title">Catalog</div>
      {
        props.ratings.map(el => {
          return (
            <div key={`${el.username}-rating`} className='release_user-ratings'>
              <div className='release-ratings_date'>{el.date}</div>
              <div className='release-ratings_info' id={`${el.username === props.username ? 'personal-rating' : ''}`}>
                <div className='release-ratings_avatar'><Avatar user={el.username} /></div>
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