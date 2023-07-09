import React from 'react';
import { uploadImage, updateUserAvatar } from '../../functions';

const Avatar = (props) => {
  const sendForm = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (data.file.size === 0) {
      updateUserAvatar(props.username, '', '');
    } else if (data.file.type !== 'image/jpeg' && data.file.type !== 'image/png') {
      document.getElementById('upload-error_filetype').style.display = 'block';
      document.getElementById('upload-error_size').style.display = 'none';
    } else if (data.file.size > 2097152) {
      document.getElementById('upload-error_size').style.display = 'block';
      document.getElementById('upload-error_filetype').style.display = 'none';
    } else {
      const imagePath = await uploadImage(`users/avatars/${props.username}`, data.file);
      updateUserAvatar(props.username, imagePath, data.caption);
    }
  }

  return (
    <div className='content-page'>
      <div className="content-wrapper">
        <h2 className='section-header'>Profile photo</h2>
        <form id='avatar-form' onSubmit={sendForm}>
        <div className="input-group">
          <label htmlFor='file'>File:</label>
          <input type='file' name='file' id='file' accept='.png, .jpg'></input>
          <div id='upload-error_size' className='upload-error warning-note'>ERROR! Your file is too big.</div>
          <div id='upload-error_filetype' className='upload-error warning-note'>ERROR! Your file must be in .jpg or .png format.</div>
        </div>
        <div className='input-group'>
          <label htmlFor='caption'>Caption (optional)</label>
          <input type="text" name='caption' id='caption' max="50"></input>
        </div>
        <input type="submit" value="Upload file"></input>
      </form>
      </div>
      
    </div>
  );
}

export default Avatar;
