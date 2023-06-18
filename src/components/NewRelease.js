import { React, useState } from 'react';
import { submitRelease } from '../functions';
import { useParams } from 'react-router-dom';

const NewReleasePage = () => {
  const [trackList, setTrackList] = useState([]);
  
  const urlParams = useParams();

  const addTrack = () => {
    const temp = trackList.slice();
    setTrackList([...temp, {number: '', title: '', time: ''}])
  }

  const removeTrack = (n) => {
    const temp = trackList.slice();
    temp.splice(n, 1);
    setTrackList([...temp]);
  }

  const clearTracklist = () => {
    if (window.confirm('Are you sure?')) {
      setTrackList([]);
    }
  }

  const updateTrackNumber = (e, n) => {
    const temp = trackList.slice();
    temp[n].number = e.target.value;
    setTrackList([...temp]);
  }

  const updateTrackTitle = (e, n) => {
    const temp = trackList.slice();
    temp[n].title = e.target.value;
    setTrackList([...temp]);
  }

  const updateTrackTime = (e, n) => {
    const temp = trackList.slice();
    temp[n].time = e.target.value;
    setTrackList([...temp]);
  }

  const trackForm = (n) => {
    return (
      <tr key={`track-input-${n}`} className="submit-tracklist-table_track">
        <td>
          <input type='button' onClick={() => removeTrack(n)} value='-' />
        </td>
        <td>
          <input type='text' 
            name={`track${n}_number`} 
            onChange={(e) => updateTrackNumber(e, n)} 
            value={trackList[n].number} />
          </td>
        <td>
          <input type='text' 
            name={`track${n}_title`} 
            onChange={(e) => updateTrackTitle(e, n)} 
            value={trackList[n].title} />
        </td>
        <td>
        <input type='text'
          name={`track${n}_time`}
          onChange={(e) => updateTrackTime(e, n)}
          value={trackList[n].time} />
        </td>
        
      </tr>
    )
  }

   const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const genres = data.genres.split(',');
    submitRelease(urlParams.artist, data.title, data.year, trackList, genres, [], [])
  }

  return (
    <div className='content-wrapper'>
      <div>
        <form method='post' id='new-release-form' onSubmit={sendForm}>
          <label htmlFor='title'>Title:</label>
          <input type='text' name='title' />
          <label htmlFor='year'>Year:</label>
          <input type='text' name='year' />
          <label htmlFor='genres'>Genres:</label>
          <input type='text' name='genres' />
          <input type='submit' value='Submit' />
          <div className='content-section'>Track listing
          <input type='button' onClick={() => addTrack()} value='add track' />
          <input type='button' onClick={() => clearTracklist()} value='clear all' />
          <table className='submit-tracklist-table'>
            <thead className='submit-tracklist-table_header'>
              <tr>
                <th> </th>
                <th>#</th>
                <th>Track Name</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
            {
              trackList.map((el, i) => {
                return (
                  trackForm(i)
                )
              })
            }
            </tbody>

          </table>
            
            <button onClick={() => console.log(trackList)}>Log</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewReleasePage;
