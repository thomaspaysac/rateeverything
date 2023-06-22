import { React, useState, useEffect } from "react";
import { getUserInfo, getArtistsList, getAllReleases, getAllReleasesLength, getPersonalRatings, getPersonalReviews } from "../functions";
import { Link } from "react-router-dom";
import ContentContainer from "./profile_page/ContentDisplay";

const ProfilePage = (props) => {
  const [artistsList, setArtistsList] = useState([]);
  const [releasesList, setReleasesList] = useState([]);
  const [userRatings, setUserRatings] = useState([]);
  const [lastRatings, setLastRatings] = useState([]);
  const [userReviews, setUserReviews] = useState([]);
  const [userDate, setUserDate] = useState();
  
  

  const getReleases = async () => {
    const data = await getAllReleases();
    setReleasesList(data);
  }

  const getList = async () => {
    const data = await getArtistsList();
    setArtistsList(data);
  }

  const getUserRatings = async () => {
    const data = await getPersonalRatings(props.userID);
    const recent= data.slice(0,1);
    setUserRatings(data);
    setLastRatings(recent);
  }

  const getUserReviews = async () => {
    const data = await getPersonalReviews(props.userID);
    setUserReviews(data);
  }

  const userInfo = async () => {
    const data = await getUserInfo(props.userID);
    setUserDate(data);
  }

  useEffect(() => {
    getReleases();
    getList();
    if (props.userID) {
      getUserRatings();
      getUserReviews();
      userInfo();
    }
  }, [])

  return (
    <div className="content-page">
    <div className="content-wrapper">
      <div className="profile-header">
        member since {userDate} <span className="profile-username">{props.username}</span>
      </div>
        <button onClick={props.sendData}>
          Send Data
        </button>
          <button onClick={() => console.log(lastRatings)}>
          Log
          </button>

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
        userReviews={userReviews}
      />
    </div>
    </div>
  )
}

export default ProfilePage;