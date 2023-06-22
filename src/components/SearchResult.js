import {React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtist, searchArtistByName } from '../functions';

const SearchResult = (props) => {
  const [artist, setArtist] = useState();

  const urlParams = useParams();


  const findArtist = async (artistName) => {
    const data = await getArtist(artistName);
    setArtist(data);
    if (!data) {
      console.log('No artist with this name')
    }
  }

  const Element = () => {
    if (artist) {
      return (
        <div>
          {artist.artist}
        </div>
      )
    } else {
      return (
        <div>
          If the artist you're looking for isn't listed, go here: <Link to='/artist/add_artist'>Add artist</Link>
        </div>
      )
    }
  }

  useEffect(() => {
    findArtist(urlParams.searchterm);
  }, [urlParams])

  return (
    <div className='content-page'>
      <div onClick={() => searchArtistByName(urlParams.searchterm)}><Element/></div>

    </div>
  );
}

export default SearchResult;
