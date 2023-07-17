import { React, useEffect } from 'react';
import { submitArtist } from '../functions';
import { useNavigate } from 'react-router-dom';

const NewArtistPage = () => {
  const navigateTo = useNavigate()

  useEffect(() => {
    document.title = 'Artist Profile - Evaluate Your Sounds'
  }, [])

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const genres = data.genres.split(',');
    submitArtist(data.name, data.formed, data.country, genres);
    navigateTo(`/submitted`);
  }

  return (
    <div className='content-page'>
      <div>
        <form method='post' id='new-artist-form' onSubmit={sendForm}>
          <label htmlFor='name'>Artist name:</label>
          <input type='text' name='name' required />
          <label htmlFor='formed'>Formed:</label>
          <input type='number' name='formed' required />
          <label htmlFor='country'>Country:</label>
          <input type='text' name='country' required />
          <label htmlFor='genres'>Genres:</label>
          <input type='text' name='genres' />
          <input type='submit' value='Submit' required/>
        </form>
      </div>

    </div>
  );
}

export default NewArtistPage;