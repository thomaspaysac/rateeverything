import { React, useState, useEffect } from "react";
import ReleaseInfo from "./release_page/ReleaseInfo";
import Rating from "./release_page/Rating";

import { getReleases, getUniqueRelease } from "../functions";

import "../App.css"



const ReleasePage = (props) => {
  const [release, setRelease] = useState([]);

  const fetchData = async() => {
    const data = await getUniqueRelease();
    setRelease(data);
  };

  useEffect(() => {
    fetchData();
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
          generalRating={release.average.toFixed(2)}
          genres="Thrash Metal"
        />
        <Rating />
      </div>
      <button onClick={() => console.log(release)}>Test</button>
    </div>
  )
}

export default ReleasePage;