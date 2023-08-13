import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { getUserInfo, parseDate } from '../../functions';
import StarsDisplay from '../multipage/StarsDisplay';
import PagesDisplay from '../multipage/PagesDisplay';
import format from 'date-fns/format';

const UserRatingsPage = (props) => {
  const [personalRating, setPersonalRating] = useState();
  const [friendsRatings, setFriendsRatings] = useState([]);
  const [othersRatings, setOthersRatings] = useState([]);
  const [displayedItems, setDisplayedItems] = useState();

  const Avatar = ({user}) => {
    const [avatar, setAvatar] = useState();    

    const fetchAvatar = async (user) => {
      if (user) {
        const data = await getUserInfo(user);
        setAvatar(data.avatar.link);
      }
    }

    useEffect(() => {
      fetchAvatar(user);
    }, [user])

    if (!avatar || avatar === '') {
      return null;
    } else {
      return (
        <img src={avatar} alt='user avatar' />
      )
    }
  }

  const sortRatings = () => {
    if (props.ratings && props.friends && props.username) {
      const allRatings = props.ratings;
      let userRating;
      const followedRatings = [];
      const leftoverRatings = [];
      allRatings.forEach((el) => {
        if (el.username === props.username) {
          userRating = el;
        } else if ((props.friends).includes(el.username)) {
          el.date = parseDate(el.date);
          followedRatings.push(el);
        } else {
          el.date = parseDate(el.date);
          leftoverRatings.push(el);
        }
      })
      const sortedFriendsRatings = followedRatings.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
      sortedFriendsRatings.forEach(el => {
        el.date = format(el.date, 'dd MMM yyyy');
      })
      const sortedOthersRatings = leftoverRatings.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
      sortedOthersRatings.forEach(el => {
        el.date = format(el.date, 'dd MMM yyyy');
      })
      setPersonalRating(userRating);
      setFriendsRatings(sortedFriendsRatings);
      setOthersRatings(sortedOthersRatings);
      setDisplayedItems(sortedOthersRatings.slice(0,15));
    }    
  }

  const DisplayPersonalRating = () => {
    if (!personalRating) {
      return null;
    } else {
      return (
        <div key={`personal-rating`} className='release_user-ratings'>
          <div className='release-ratings_date personal-rating'>{personalRating.date}</div>
          <div className='release-ratings_info'>
            <div className='release-ratings_avatar'><Avatar user={personalRating.username} /></div>
            <div className='release-ratings_username bolded'><Link to={`/profile/${personalRating.username}`}>{personalRating.username}</Link></div>
            <div className='rating_stars-display'>
              <StarsDisplay key={`el.rating`} rating={personalRating.rating} />
            </div>
          </div>
        </div>
      )
    }
  }

  const DisplayFriendsRatings = () => {
    if (!friendsRatings) {
      return null;
    } else {
      return (
        friendsRatings.map(el => {
          return (
            <div key={`${el.username}-rating`} className='release_user-ratings'>
              <div className='release-ratings_date'>{el.date}</div>
              <div className='release-ratings_info friend-rating'>
                <div className='release-ratings_avatar'><Avatar user={el.username} /></div>
                <div className='release-ratings_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
                <div className='rating_stars-display'>
                  <StarsDisplay key={`el.rating`} rating={el.rating} />
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }

  const DisplayOthersRatings = ({display}) => {
    if (!display) {
      return null;
    } else {
      return (
        display.map(el => {
          return (
            <div key={`${el.username}-rating`} className='release_user-ratings'>
              <div className='release-ratings_date'>{el.date}</div>
              <div className='release-ratings_info' id={`${el.username === props.username ? 'personal-rating' : ''}`}>
                <div className='release-ratings_avatar'><Avatar user={el.username} /></div>
                <div className='release-ratings_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
                <div className='rating_stars-display'>
                  <StarsDisplay key={`el.rating`} rating={el.rating} />
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }

  // Old code
  /*const DisplayAllRatings = () => {
    if (!props.ratings) {
      return null;
    } else {
      props.ratings.map(el => {
        return (
          <div key={`${el.username}-rating`} className='release_user-ratings'>
            <div className='release-ratings_date'>{el.date}</div>
            <div className='release-ratings_info' id={`${el.username === props.username ? 'personal-rating' : ''}`}>
              <div className='release-ratings_avatar'><Avatar user={el.username} /></div>
              <div className='release-ratings_username bolded'><Link to={`/profile/${el.username}`}>{el.username}</Link></div>
              <div className='rating_stars-display'>
                <StarsDisplay key={`el.rating`} rating={el.rating} />
              </div>
            </div>
          </div>
        )
      })
    } 
  }*/

  const loadPage = (i, range) => {
    setDisplayedItems(othersRatings.slice((i * range), (i * range + range)))
  }

  useEffect(() => {
    console.log(props.ratings)
    sortRatings();
  }, [props.ratings, props.friends, props.username])

  return (
    <div className='release_user-ratings-list'>
      <div className="rating-component_title">{props.ratings.length} Ratings</div>  
      <div className='ratings_page-selector'>
        <div className='greyed-text'>Page</div>
        <PagesDisplay items={othersRatings} range={15} loadPage={loadPage} />
      </div>
      <DisplayPersonalRating />
      <DisplayFriendsRatings />
      <DisplayOthersRatings display={displayedItems} />
    </div>
  )
}

export default UserRatingsPage;