import { React, useState, useEffect } from "react";
import ArtistInfo from "./artist_page/ArtistInfo";
import ReleasesList from "./artist_page/ReleasesList";
import { getArtist } from "../functions";


const ArtistPage = () => {
  const [artist, setArtist] = useState([]);

  const fetchData = async (artist) => {
    const data = await getArtist(artist);
    setArtist(data);
  };

  useEffect(() => {
    fetchData('Metallica');
  }, []);

  return (
    <div className="artist-page">
      <div className="artist_left-col">
      <button onClick={() => console.log(artist)}>Test</button>
      </div>
      <div className="artist_right-col">
        <ArtistInfo
          artist={artist.artist}
          formed={artist.formed}
          country={artist.country}
          genres={artist.genres}
          artistID={artist.artistID} />
        <ReleasesList />
      </div>
    </div>
  )
}

export default ArtistPage;