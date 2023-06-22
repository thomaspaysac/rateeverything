import {React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtist, searchArtistByName, getAllReleases, searchRelease } from '../functions';

const ArtistsList = (props) => {
  return (
    <div>
      <div>Artists</div>
        {
          props.artists.map((el) => {
            return (
              <div>
                <Link to={`/artist/${el.artist}`}>{el.artist}</Link>
              </div>
            )
          })
        }
    </div>
  ) 
}

const ReleasesList = (props) => {
  return (
    <div>
      <div>Releases</div>
      {
        props.releases.map((el) => {
          return (
            <div>
              <Link to={`/release/${el.artist}/${el.release}`}>{el.release}</Link> - <Link to={`/artist/${el.artist}`}>{el.artist}</Link>
            </div>
          )
        })
      }
    </div>
  )
}


const SearchResult = (props) => {
  const [artists, setArtists] = useState([]);
  const [releases, setReleases] = useState([]);

  const urlParams = useParams();


  const searchResult = async (prompt) => {
    if (urlParams.searchcategory === 'artists') {
      const result = await searchArtistByName(prompt);
      if (result.length === 0) {
        setArtists([]);
        console.log('No artist with this name.')
      } else {
        setArtists(result);
      }
    } else if (urlParams.searchcategory === 'releases') {
      const result = await searchRelease(prompt);
      if (result.length === 0) {
        setReleases([]);
        console.log('No release with this title.')
      } else {
        setReleases(result);
      }
    }
  }

  useEffect(() => {
    searchResult(urlParams.searchterm);
  }, [urlParams])

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        <ArtistsList artists={artists} />
        <ReleasesList releases={releases} />
        <div>
          If the artist you're looking for isn't listed, go here: <Link to='/artist/add_artist'>Add artist</Link>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
