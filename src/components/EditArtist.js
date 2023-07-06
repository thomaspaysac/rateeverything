import {React, useState, useEffect} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { getArtistByID } from '../functions';

const EditArtist = () => {
  const [artistInfo, setArtistInfo] = useState();

  const urlParams = useParams();
  const navigateTo = useNavigate();

  const getArtistInfo = async () => {
    const data = await getArtistByID(+urlParams.id);
    console.log(data);
    setArtistInfo(data);
  }

  useEffect(() => {
    getArtistInfo();
  }, [])

  const displayArtistName = () => {
    if (!artistInfo) {
      return null;
    } else {
      return (
        <Link to={`/artist/${artistInfo.artist}`} className='bolded'>{artistInfo.artist}</Link>
      )
    }
  }

  const formContainer = () => {
    if (!artistInfo) {
      return null
    } else {
      return (
        <div>
          <div className="submission_input-group">
            <label htmlFor='artistName' className='bolded form-label'>Artist name:</label>
            <input className='submission_input-group' name='artistName' id='artistName' defaultValue={artistInfo.artist} />
          </div>
          <div className='submission_input-group'>
            <label htmlFor='artistFormed' className='bolded form-label'>Formed:</label>
            <input name='artistFormed' id='artistFormed' defaultValue={artistInfo.formed} />
          </div>
          <div className='submission_input-group'>
            <label htmlFor='artistCountry' className='bolded form-label'>Country:</label>
            <input name='artistCountry' id='artistCountry' defaultValue={artistInfo.country} />
          </div>
          <div className='submission_input-group'>
            <label htmlFor='artistGenres' className='bolded form-label'>Genres:</label>
            <input name='artistGenres' id='artistGenres' defaultValue={artistInfo.genres} />
          </div>
        </div>
      )
    }
  }

  const sendForm = () => {

  }

  return (
    <div className='content-page edit-artist_page'>
      <div className='content-wrapper'>
        <h2 className='section-header'>Update profile for {displayArtistName()}</h2>
        <div className='warning'>
          <div className="bolded">Attention:</div>
          <ol>
            <li>Read the Artist profile wiki page for the rules/standards that must be followed when entering an artist profile.</li>
            <li>It is not necessary to complete every field on this page. However, in the fields which you do complete, please try to be as comprehensive and correct as possible.</li>
            <li>Do not place any links to other websites in this form, except in the Meta-Comments (as sources/references).</li>
          </ol>
        </div>

        <form method='post' id='edit-artist-form' onSubmit={sendForm}>
          {formContainer()}
        </form>
      </div>
    </div>
  );
}

export default EditArtist;
