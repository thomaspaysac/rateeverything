import { React, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import ReleaseInfo from "./release_page/ReleaseInfo";
import UserRatingsPage from "./release_page/UserRatings";
import Reviews from "./release_page/Reviews";
import AddReview from "./release_page/AddReview";
import Tracklist from "./release_page/Tracklist";
import StarRating from "./release_page/StarRating";
import CatalogPopup from "./release_page/CatalogPopup";

import { getReleaseByID, getUserInfo } from "../functions";

import reviewIcon from '../../src/img/write-review.png';

const ReviewWritingUI = ({reviewUI, releaseID}) => {
  if (reviewUI) {
    return (
      <AddReview 
      releaseID={releaseID}
    />
    )
  } else {
    return null
  }
}

const ReleasePage = (props) => {
  const [release, setRelease] = useState([]);
  const [genres, setGenres] = useState([]);
  const [releaseID, setReleaseID] = useState(undefined);
  const [ratings, setRatings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [reviewUI, setReviewUI] = useState(false);
  const [trackList, setTracklist] = useState([]);
  const [totalTime, setTotalTime] = useState();
  const [imagePath, setImagePath] = useState();
  const [friends, setFriends] = useState([]);

  const urlParams = useParams();

  const calculateTotalTime = (data) => {
    const tracks = [];
    data.tracks.map(el => {
      const separatedTime = el.time.split(':')
      const trackTime = +separatedTime[0] * 60 + +separatedTime[1]
      tracks.push(trackTime);
    })
    const totalSeconds = tracks.reduce((acc, curr) => acc + curr, 0);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    if (seconds < 10) {
      setTotalTime(`${minutes}:0${seconds}`);
    } else {
      setTotalTime(`${minutes}:${seconds}`);
    }
  }

  const fetchDataByID = async (albumID) => {
    const data = await getReleaseByID(albumID);
    const sortedRatings = data.ratings.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setRatings(sortedRatings);
    setImagePath(data.imagePath);
    setGenres(data.genres.join(', '));
    setRelease(data);
    setReleaseID(data.albumID);
    setReviews(data.reviews);
    setTracklist(data.tracks)
    calculateTotalTime(data);
  }

  const toggleReviewUI = () => {
    if (reviewUI) {
      setReviewUI(false)
    } else {
      setReviewUI(true)
    }
  }

  const getFriends = async () => {
    if (props.username) {
      const data = await getUserInfo(props.username);
      setFriends(data.follow);
    }
  }

  useEffect(() => {
    fetchDataByID(+urlParams.releaseID);
  }, []);

  useEffect(() => {
    document.title = `${release.release} by ${release.artist}`;
    getFriends();
  }, [props.username, release])

  const CatalogContainer = ({userStatus, isVerified}) => {
    if (!userStatus) {
      return (
        <div className="rating-actions">
          <div><Link to='/account/signin'>Log in</Link> to rate/catalog this release</div>
        </div>
      )
    } else if (!isVerified) {
      return (
        <div className="rating-actions">
          <div>Verify your email to rate/catalog this release</div>
        </div>
      )
    }
    else {
      return (
        <div className="rating-actions">
          <div className="rating-container">
            <StarRating
              releaseID={releaseID}
              ratings={ratings}
              username={props.username} />
          </div>
          <CatalogPopup 
            releaseID={releaseID}
            username={props.username}
          />
          <button className="catalog-review" onClick={toggleReviewUI}>
            <img src={reviewIcon} alt='' /> Review
          </button>
        </div>
      )
    }
  }

  const ContributionsContainer = ({userStatus, isVerified}) => {
    if (!userStatus) {
      return (
        <div><Link to='/account/signin'>Log in</Link> to submit a correction or upload art for this release</div>
      )
    } else if (!isVerified) {
      return (
        <div>Verify your email to submit a correction or upload art for this release</div>
      )
    } else {
      return (
        <div className='contribution'>
          <div className='contribution-group'>
            <Link to={`/releases/edit/${releaseID}`}><button className='contribution-button'>Correct entry</button></Link>
            <Link to={`/releases/history/${releaseID}`}><button className='contribution-button'>History</button></Link>
          </div>
        </div>
      );
      }
  }

  return (
    <div className="release-page content-page">
      <div className="release_left-col">
        <div className="release-page_image-frame">
          <img src={imagePath} alt="cover art" className="release-page_image" />
        </div>
        <Tracklist 
          tracks={trackList}
          totalTime={totalTime}
        />
      </div>
      <div className="release_right-col">
        <ReleaseInfo
          id={`Album${release.albumID}`}
          title={release.release}
          artist={release.artist}
          type="Album"
          date={release.year}
          generalRating={release.average}
          ratingsNumber={ratings.length}
          genres={genres}
        />
        <div className="rating-component">
          <div className="rating-component_title">Rate/Catalog</div>
            <CatalogContainer userStatus={props.userStatus} isVerified={props.isVerified} />
        </div>
        <ReviewWritingUI 
          reviewUI={reviewUI}
          releaseID={releaseID}
        />
        <Reviews
          reviews={reviews} 
          ratings={ratings}
        />  
        <UserRatingsPage
          ratings={ratings}
          username={props.username}
          friends={friends} />
      </div>

      <div className='release-page_contributions'>
        <h2>Contributions</h2>
        <ContributionsContainer userStatus={props.userStatus} isVerified={props.isVerified} />
      </div>
    </div>
  )
}

export default ReleasePage;