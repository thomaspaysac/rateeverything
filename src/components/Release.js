import React from "react";
import ReleaseInfo from "./release_page/ReleaseInfo";
import Rating from "./release_page/Rating";
import "../App.css"

const ReleasePage = (props) => {
  return (
    <div className="release-page">
      <div className="release_left-col">

      </div>
      <div className="release_right-col">
        <ReleaseInfo
          id="Album1"
          title="Master of Puppets"
          artist="Metallica"
          type="Album"
          date="1986"
          generalRating="4.03"
          genres="Thrash Metal"
        />
        <Rating />
      </div>
    </div>
  )
}

export default ReleasePage;