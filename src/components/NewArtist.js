import { React, useEffect } from 'react';
import { submitArtist } from '../functions';
import { useNavigate } from 'react-router-dom';

const NewArtistPage = (props) => {
  const navigateTo = useNavigate()

  useEffect(() => {
    document.title = 'Artist Profile - Evaluate Your Sounds'
  }, [])

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const genres = data.genres.split(',');
    submitArtist(data.name, data.formed, data.country, genres, props.username);
    navigateTo(`/submitted`);
  }

  return (
    <div className='content-page edit-artist_page'>
      <div className='content-wrapper'>
        <h2 className='section-header'>Add artist</h2>

        <div className='global-container'>
          <div className='warning'>
            <div className="bolded">Attention:</div>
            <ol>
              <li>Read the Artist profile wiki page for the rules/standards that must be followed when entering an artist profile.</li>
              <li>It is not necessary to complete every field on this page. However, in the fields which you do complete, please try to be as comprehensive and correct as possible.</li>
              <li>Do not place any links to other websites in this form, except in the Meta-Comments (as sources/references).</li>
              <li>If you submit a new artist to RYM you must also add a release or music/film credit for them soon afterwards. Do not submit an artist if you do not intend to do so. Empty artist pages will be deleted.</li>
            </ol>
          </div>
          <div>
          <form method='post' id='new-artist-form' onSubmit={sendForm}>
            <div className='submission_input-group'>
              <label htmlFor='name' className='bolded form-label'>Artist name:</label>
              <input type='text' name='name' required />
            </div>
            <div className='submission_input-group'>
              <label htmlFor='formed' className='bolded form-label'>Formed:</label>
              <input type='number' name='formed' required />
            </div>
            <div className='submission_input-group'>
              <label htmlFor='country' className='bolded form-label'>Country:</label>
              <input type='text' name='country' required />
            </div>
            <div className='submission_input-group'>
              <label htmlFor='genres' className='bolded form-label'>Genres:</label>
              <input type='text' name='genres' />
            </div>
            <input id='edit-artist_submit-button' className='bolded' type='submit' value='Submit' required/>
          </form>
          </div>
        </div>

    </div>
    </div>
  );
}

export default NewArtistPage;