import {React, useEffect, useState} from 'react';
import { useParams, Link } from 'react-router-dom';
import { getArtist, searchArtistByName, getAllReleases, searchRelease } from '../functions';

const Results = (props) => {
  const urlParams = useParams();
  if (urlParams.searchcategory === 'artists') {
    return (
      <div>
        <h3>Artists</h3>
        {
          props.artists.map((el) => {
            return (
              <div className='search-result_card'>
                <div className='search-result_card-image'>O</div>
                <div className='search-result_card-info'>
                  <div className='artist-data'>
                    <Link to={`/artist/${el.artist}`} className='artist-name bolded'>{el.artist}</Link>
                    <div className='artist-id'>[Artist{el.artistID}]</div>
                  </div>
                  <div className='genres'>
                    {el.genres.join(', ')}
                  </div>
                  <div className='artist-country'>
                    Formed {el.formed} in {el.country}
                  </div>

                </div>
              </div>
            )
          })
        }
      </div>
    )
  } else if (urlParams.searchcategory === 'releases') {
    return (
      <div>
        <h3>Releases</h3>
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
      <div className='search-results_container content-wrapper'>
        <div className='search-prompt'>Search results for <span className='bolded'>{urlParams.searchterm}</span></div>
        <Results 
          artists={artists} 
          releases={releases} 
        />
        <div>
          If the artist you're looking for isn't listed, go here: <Link to='/artist/add_artist'>Add artist</Link>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
