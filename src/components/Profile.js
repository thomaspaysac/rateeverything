import { React, useState, useEffect } from "react";
import { getUserInfo, getArtistsList, getAllReleases, getPersonalRatings, getPersonalReviews } from "../functions";
import { Link, useParams } from "react-router-dom";
import ContentContainer from "./profile_page/ContentDisplay";

const ProfilePage = (props) => {
  const [artistsList, setArtistsList] = useState([]);
  const [releasesList, setReleasesList] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [lastRatings, setLastRatings] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [lastReview, setLastReview] = useState();
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
    const recent = data.slice(0,1);
    setUserRatings(data);
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
    console.log(data.avatar);
  }

  useEffect(() => {
    getReleases();
    getList();
    if (urlParams.username) {
      getUserRatings();
      getUserReviews();
      userInfo();
    }
  }, [])

  return (
    <div className="content-page">
    <div className="content-wrapper">
      <div className="pofile_user-info">
        <div className="profile-header">
          member since {userDate} <span className="profile-username">{urlParams.username}</span>
        </div>
        <Link to="/profile/avatar">
          <div className="profile_avatar"><img src={avatar} alt='avatar' title={avatarCaption} /></div>
        </Link>
      </div>
      
          <div>{artistsList.map((el) => {
        return (
          <Link to={`/artist/${el}`} key={el}>
              {el}
          </Link>
        );
      })}</div>
      <div>
        <Link to='/artist/add_artist'>Add new artist</Link>
      </div>

      <ContentContainer
        userRatings={userRatings}
        lastRatings={lastRatings}
        lastReview={lastReview}
      />
    </div>
    </div>
  )
}

export default ProfilePage;