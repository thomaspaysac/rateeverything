import React from "react";
import ArtistInfo from "./artist_page/ArtistInfo";
import ReleasesList from "./artist_page/ReleasesList";


const ArtistPage = () => {
  return (
    <div className="artist-page">
      <div className="artist_left-col">

      </div>
      <div className="artist_right-col">
        <ArtistInfo />
        <ReleasesList />
      </div>
    </div>
  )
}

export default ArtistPage;