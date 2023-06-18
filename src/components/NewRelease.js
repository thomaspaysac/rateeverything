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
      <div key={`track-input-${n}`} className="input-group">
        <input type='button' onClick={() => removeTrack(n)} value='-' />
        <input type='text' 
          name={`track${n}_number`} 
          onChange={(e) => updateTrackNumber(e, n)} 
          value={trackList[n].number} />
        <input type='text' 
          name={`track${n}_title`} 
          onChange={(e) => updateTrackTitle(e, n)} 
          value={trackList[n].title} />
        <input type='text'
          name={`track${n}_time`}
          onChange={(e) => updateTrackTime(e, n)}
          value={trackList[n].time} />
      </div>
    )
  }

   const sendForm = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    console.log(data);
    const tracklist = data.tracklist.split(',');
    const genres = data.genres.split(',');
    submitRelease(urlParams.artist, data.title, data.year, trackList, genres, [], [])
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
          <div>Tracklist :
          <input type='button' onClick={() => addTrack()} value='Add track' />
            {
              trackList.map((el, i) => {
                return (
                  trackForm(i)
                )
              })
            }
            <button onClick={() => console.log(trackList)}>Log</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NewReleasePage;
