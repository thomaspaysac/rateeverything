import React from 'react';
import { submitRelease } from '../functions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

const NewReleasePage = () => {
  const urlParams = useParams();

  const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const tracklist = data.tracklist.split(',');
    const genres = data.genres.split(',');
    submitRelease(urlParams.artist, data.title, data.year, tracklist, genres, [], [])
  }

  return (
    <div>
      <div>
        <form method='post' id='new-release-form' onSubmit={sendForm}>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' />
          <label htmlFor='year'>Year:</label>
          <input type='text' name='year' />
          <label htmlFor='genres'>Genres:</label>
          <input type='text' name='genres' />
          <label htmlFor='tracklist'>Tracklist:</label>
          <input type='text' name='tracklist'/>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
}

export default NewReleasePage;
