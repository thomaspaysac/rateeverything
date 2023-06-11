import { React, useState, useEffect } from "react";
import ReleaseInfo from "./release_page/ReleaseInfo";
import Rating from "./release_page/Rating";

import { getReleases, getUniqueRelease } from "../functions";

import "../App.css"



const ReleasePage = (props) => {
  const [release, setRelease] = useState([]);

  const fetchData = async (artist) => {
    const data = await getUniqueRelease(artist);
    setRelease(data);
  };

  useEffect(() => {
    fetchData('Metallica');
  }, []);

  return (
    <div className="release-page">
      <div className="release_left-col">

      </div>
      <div className="release_right-col">
        <ReleaseInfo
          id="Album1"
          title={release.release}
          artist={release.artist}
          type="Album"
          date={release.year}
          generalRating={release.average}
          genres="Thrash Metal"
        />
        <Rating />
      </div>
      <button onClick={() => console.log(release)}>Test</button>
    </div>
  )
}

export default ReleasePage;