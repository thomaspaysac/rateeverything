import { React, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuth } from "firebase/auth";
import ReleaseInfo from "./release_page/ReleaseInfo";
import Rating from "./release_page/Rating";

import { getReleases, getUniqueRelease } from "../functions";

import "../App.css"

const ReleasePage = (props) => {
  const [release, setRelease] = useState([]);
  const [genres, setGenres] = useState([]);
  const [releaseID, setReleaseID] = useState(undefined);

  const urlParams = useParams();

  const fetchData = async (artist, releaseName) => {
    const data = await getUniqueRelease(artist, releaseName);
    setGenres(data.genres.join(', '));
    setRelease(data);
    setReleaseID(data.albumID)
  };

  useEffect(() => {
    fetchData(urlParams.artist, urlParams.release);
  }, []);

  return (
    <div className="release-page">
      <div className="release_left-col">

      </div>
      <div className="release_right-col">
        <ReleaseInfo
          id={`Album${release.albumID}`}
          title={release.release}
          artist={release.artist}
          type="Album"
          date={release.year}
          generalRating={release.average}
          genres={genres}
        />
        <Rating
          releaseID={releaseID}
        />
      </div>
      <button onClick={() => console.log(release)}>Test</button>
    </div>
  )
}

export default ReleasePage;