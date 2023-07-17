import { React, useState, useEffect } from "react";
import { getUserInfo, getArtistsList, getAllReleases, getPersonalRatings, getPersonalReviews, getCollection, getWishlist } from "../functions";
import { Link, useParams } from "react-router-dom";
import ContentContainer from "./profile_page/ContentDisplay";

const ProfilePage = (props) => {
  const [artistsList, setArtistsList] = useState([]);
  const [releasesList, setReleasesList] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [lastRatings, setLastRatings] = useState([]);
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
    const sortedData = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    const recent = data.slice(0,1);
    setUserRatings(sortedData);
    setLastRatings(recent);
  }

  const getUserReviews = async () => {
    const data = await getPersonalReviews(urlParams.username);
    if (!data) {
      return null;
    } else {
      const lastReview = data.slice(-1);
      setUserReviews(data);
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
      />
    </div>
    </div>
  )
}

export default ProfilePage;