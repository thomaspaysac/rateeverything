import { React, useState, useEffect } from "react";
import { getUserInfo, getArtistsList, getAllReleases, getPersonalRatings, getPersonalReviews, getCollection, getWishlist } from "../functions";
import { Link, useParams } from "react-router-dom";
import ContentContainer from "./profile_page/ContentDisplay";

const ProfilePage = (props) => {
  const [artistsList, setArtistsList] = useState([]);
  const [releasesList, setReleasesList] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [lastRatings, setLastRatings] = useState([]);
  const [ratingsByScore, setRatingsByScore] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [lastReview, setLastReview] = useState();
  const [userCollection, setUserCollection] = useState([]);
  const [userWishlist, setUserWishlist] = useState([]);
  const [userDate, setUserDate] = useState();
  const [avatar, setAvatar] = useState();
  const [avatarCaption, setAvatarCaption] = useState();
  
  const urlParams = useParams();

  const getReleases = async () => {
    const data = await getAllReleases();
    setReleasesList(data);
  }

  const getList = async () => {
    const data = await getArtistsList();
    setArtistsList(data);
  }

  const getUserRatings = async () => {
    const data = await getPersonalRatings(urlParams.username);
    const sortedDataByDate = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    const sortedRatingsByScore = Array(10).fill([]);
    sortedDataByDate.forEach(el => {
      switch (el.rating) {
        case '0.5':
          sortedRatingsByScore[0] = [...sortedRatingsByScore[0], el];
          break;
        case '1.0':
          sortedRatingsByScore[1] = [...sortedRatingsByScore[1], el];
          break;
        case '1.5':
          sortedRatingsByScore[2] = [...sortedRatingsByScore[2], el];
          break;
        case '2.0':
          sortedRatingsByScore[3] = [...sortedRatingsByScore[3], el];
          break;
        case '2.5':
          sortedRatingsByScore[4] = [...sortedRatingsByScore[4], el];
          break;
        case '3.0':
          sortedRatingsByScore[5] = [...sortedRatingsByScore[5], el];
          break;
        case '3.5':
          sortedRatingsByScore[6] = [...sortedRatingsByScore[6], el];
          break;
        case '4.0':
          sortedRatingsByScore[7] = [...sortedRatingsByScore[7], el];
          break;
        case '4.5':
          sortedRatingsByScore[8] = [...sortedRatingsByScore[8], el];
          break;
        case '5.0':
          sortedRatingsByScore[9] = [...sortedRatingsByScore[9], el];
          break;
        default : 
          throw new Error('Wrong paramater');
      }
    });
    const recent = data.slice(0,1);
    setUserRatings(sortedDataByDate);
    setLastRatings(recent);
    setRatingsByScore([...sortedRatingsByScore]);
  }

  const getUserReviews = async () => {
    const data = await getPersonalReviews(urlParams.username);
    const sortedData = data.sort((a, b) => (a.reviewDate < b.reviewDate) ? 1 : (a.reviewDate > b.reviewDate) ? -1 : 0);
    if (!data) {
      return null;
    } else {
      const lastReview = sortedData[0];
      setUserReviews(sortedData);
      setLastReview(lastReview);
    }
  }

  const userInfo = async () => {
    const data = await getUserInfo(urlParams.username);
    setUserDate(data.date);
    setAvatar(data.avatar.link);
    setAvatarCaption(data.avatar.caption);
  }

  const getUserCollection = async () => {
    const data = await getCollection(urlParams.username);
    const sortedData = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setUserCollection(sortedData);
  }

  const getUserWishlist = async () => {
    const data = await getWishlist(urlParams.username);
    setUserWishlist(data);
  }

  useEffect(() => {
    document.title = `Profile: ${urlParams.username} - Evaluate Your Sounds`
    getReleases();
    getList();
    if (urlParams.username) {
      getUserRatings();
      getUserReviews();
      getUserCollection();
      getUserWishlist();
      userInfo();
    }
  }, [])

  const avatarDisplay = () => {
    if (!avatar || avatar === '') {
      return (
        <div>Upload a profile picture</div>
      )
    } else {
      return (
        <img src={avatar} alt='avatar' title={avatarCaption} />
      )
    }
  }

  return (
    <div className="content-page">
    <div className="content-wrapper">
      <div>
        <div className="profile-header">
          member since {userDate} <span className="profile-username">{urlParams.username}</span>
        </div>
        <div className="profile_user-info">
          <div className="profile_avatar"><Link to="/profile/avatar">{avatarDisplay()}</Link></div>
        </div>
      </div>

      <ContentContainer
        userRatings={userRatings}
        lastRatings={lastRatings}
        lastReview={lastReview}
        collection={userCollection}
        wishlist={userWishlist}
        reviews={userReviews}
        ratingsByScore={ratingsByScore}
      />
    </div>
    </div>
  )
}

export default ProfilePage;