import { React, useState, useEffect } from 'react';
import { updateRelease, uploadImage } from '../functions';
import { useParams, useNavigate } from 'react-router-dom';
import { getReleaseByID } from '../functions';

const EditRelease = (props) => {
  const [releaseInfo, setReleaseInfo] = useState();
  const [trackList, setTrackList] = useState([]);
  
  const urlParams = useParams();
  const navigateTo = useNavigate();

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
          <input className='tracklist-td_remove' type='button' onClick={() => removeTrack(n)} value='-' />
        </td>
        <td>
          <input className='tracklist-td_number' type='text' 
            name={`track${n}_number`} 
            onChange={(e) => updateTrackNumber(e, n)} 
            defaultValue={trackList[n].number} />
          </td>
        <td>
          <input className='tracklist-td_title' type='text' 
            name={`track${n}_title`} 
            onChange={(e) => updateTrackTitle(e, n)} 
            defaultValue={trackList[n].title} />
        </td>
        <td>
        <input className='tracklist-td_time' type='text'
          name={`track${n}_time`}
          onChange={(e) => updateTrackTime(e, n)}
          defaultValue={trackList[n].time} />
        </td>
      </tr>
    )
  }

  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const genres = data.genres.split(',');
    if (data.coverart.size === 0) {
      updateRelease(releaseInfo.artist, +urlParams.id, data.title, data.year, trackList, genres, props.username);
      navigateTo(`/submitted`);
    } else if (data.coverart.type !== 'image/jpeg' && data.coverart.type !== 'image/png') {
      document.getElementById('upload-error_filetype').style.display = 'block';
      document.getElementById('upload-error_size').style.display = 'none';
    } else if (data.coverart.size > 2097152) {
      document.getElementById('upload-error_size').style.display = 'block';
      document.getElementById('upload-error_filetype').style.display = 'none';
    } else {
      const imageName = (urlParams.artist + '_' + data.title).toLowerCase();
      const imagePath = await uploadImage(`releases_art/${urlParams.artist}/${imageName}`, data.coverart);
      updateRelease(releaseInfo.artist, +urlParams.id, data.title, data.year, trackList, genres, props.username, imagePath);
      navigateTo(`/submitted`);
    }
  }

  const getReleaseInfo = async () => {
    const data = await getReleaseByID(+urlParams.id);
    setReleaseInfo(data);
    setTrackList(data.tracks);
  }

  const ReleaseStep = () => {
    if (!releaseInfo) {
      return null;
    } else {
      return (
        <div className='add-release_step-box'>
            <label htmlFor='title' className='bolded add-release_step-label'>1.1 Title</label>
            <div className='separator'></div>
            <div className='add-release_input-group'>
              <input type='text' name='title' value={releaseInfo.release} readOnly />
              <div className='note'><span className='bolded'>Note:</span> The release title must follow RYS's Capitalization rules for titles.</div>
            </div>
            <label htmlFor='year' className='bolded add-release_step-label'>1.2 Release date</label>
            <div className='separator'></div>
            <div className='add-release_input-group'>
              <input type='text' name='year' defaultValue={releaseInfo.year} />
            </div>
            <label htmlFor='genres' className='bolded add-release_step-label'>1.3 Genres:</label>
            <div className='separator'></div>
            <div className='add-release_input-group'>
              <input type='text' name='genres' defaultValue={releaseInfo.genres} />
            </div>
          </div>
      )
    }
  }

  const tracklistStep = () => {
    if (!releaseInfo) {
      return null
    } else {
      return (
        <div className='content-section'>
              <div className='warning-note'><span className='bolded'>Note:</span> Please read the Standards for track listing guide before entering tracks for the first time!</div>
              <div className='note'>Also note that track names should adhere to the Capitalization rules.</div>
            <div className='tracklist_actions'>
              <input type='button' onClick={() => addTrack()} value='add track' />
              <input type='button' onClick={() => clearTracklist()} value='clear all' />
            </div>
            <table className='submit-tracklist-table'>
              <thead className='submit-tracklist-table_header'>
                <tr>
                  <th className='tracklist-th'> </th>
                  <th className='tracklist-th'>#</th>
                  <th className='tracklist-th'>Track Name</th>
                  <th className='tracklist-th'>Time</th>
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
            </div>
      )
    }
  }

  useEffect(() => {
    document.title = 'Release Editing - Evaluate Your Sounds'
    getReleaseInfo();
  }, [])

  return (
    <div className='content-page edit-release_page'>
      <div className='content-wrapper'>
        <div className="section-header bolded" onClick={() => console.log(releaseInfo)}>Edit release</div>
        <div className='warning'>
          <div className="bolded">Please Note:</div>
          <ol>
            <li>Read the Add a release and Add release information pages for the rules/standards that must be followed when submitting a release.</li>
            <li>Mind the Capitalization rules when entering the release title and track listing.</li>
          </ol>
        </div>
        <div>
          <form method='post' id='new-release-form' onSubmit={sendForm}>
          <div className='edit-release_step-header bolded'><span className='add-release_step-number'>Step 1:</span> Release</div>
          <ReleaseStep />
          <div className='edit-release_step-header'><span className="bolded"><span className='add-release_step-number'>Step 2:</span> Track listing</span></div>
            {tracklistStep()}
            <div className='edit-release_step-header'><span className="bolded"><span className='add-release_step-number'>Step 3:</span> Cover art</span></div>
            <div className='content-section'>
              <input type='file' name='coverart' id='covertart-upload' accept='.png, .jpg'></input>
              <div className='warning-note'><span className='bolded'>Note:</span> The file must be in .jpg or .png format and be smaller than 2MB.</div>
              <div id='upload-error_size' className='upload-error warning-note'>ERROR! Your file is too big.</div>
              <div id='upload-error_filetype' className='upload-error warning-note'>ERROR! Your file must be in .jpg or .png format.</div>
            </div>
            <input id='edit-release_submit-button' className='bolded' type='submit' value='Submit release' />
          </form>
        </div>
      </div>
    </div>
  );
}

export default EditRelease;
