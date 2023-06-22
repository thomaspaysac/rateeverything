import {React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtist, searchArtistByName } from '../functions';

const SearchResult = (props) => {
  const [artist, setArtist] = useState([]);

  const urlParams = useParams();


  const findArtist = async (artistName) => {
    const result = await searchArtistByName(artistName);
    if (result.length === 0) {
      setArtist([]);
      console.log('No artist with this name')
    } else {
      setArtist(result);
    }
  }

  useEffect(() => {
    findArtist(urlParams.searchterm);
  }, [urlParams])

  return (
    <div className='content-page'>
      <div>
        {
          artist.map((el) => {
            return (
              <div>
                <Link to={`/artist/${el.artist}`}>{el.artist}</Link>
              </div>
            )
          })
        }
      </div>
      <div>
        If the artist you're looking for isn't listed, go here: <Link to='/artist/add_artist'>Add artist</Link>
      </div>
    </div>
  );
}

export default SearchResult;
