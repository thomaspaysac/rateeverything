import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReleaseInfo from "./release_page/ReleaseInfo";
import Rating from "./release_page/Rating";
import UserRatingsPage from "./release_page/UserRatings";
import Reviews from "./release_page/Reviews";
import AddReview from "./release_page/AddReview";
import Tracklist from "./release_page/Tracklist";

import { getUniqueRelease } from "../functions";

import "../App.css"

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

  const fetchData = async (artist, releaseName) => {
    const data = await getUniqueRelease(artist, releaseName);
    const sortedRatings = data.ratings.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setImagePath(data.imagePath);
    setGenres(data.genres.join(', '));
    setRelease(data);
    setRatings(sortedRatings);
    setReleaseID(data.albumID);
    setReviews(data.reviews);
    setTracklist(data.tracks)
    calculateTotalTime(data);
  };

  const toggleReviewUI = () => {
    if (reviewUI) {
      setReviewUI(false)
    } else {
      setReviewUI(true)
    }
  }

  useEffect(() => {
    fetchData(urlParams.artist, urlParams.release);
  }, []);

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
        <Rating
          releaseID={releaseID}
          onClick={toggleReviewUI}
        />
        <ReviewWritingUI 
          reviewUI={reviewUI}
          releaseID={releaseID}
        />
        <Reviews
          reviews={reviews} 
          ratings={ratings}
        />  
        <UserRatingsPage
          ratings={ratings} />
      </div>

    </div>
  )
}

export default ReleasePage;