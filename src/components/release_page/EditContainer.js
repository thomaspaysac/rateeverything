import React from 'react';
import { Link } from 'react-router-dom';
import { getAuth } from 'firebase/auth';

const UserActions = (props) => {
  if (!props.userStatus) {
    return (
      <div><Link to='/account/signin'>Log in</Link> to submit a correction or upload art for this release</div>
    )
  } else return (
    <div className='contribution'>
      <div className='contribution-group'>
        <button className='contribution-button'>Correct entry</button>
        <button className='contribution-button'>History</button>
      </div>
    </div>
  );
}


const EditContainer = (props) => {
  return (
    <div className='release-page_contributions'>
      <h2>Contributions</h2>
      <UserActions userStatus={props.userStatus} />
    </div>

  )

}

export default EditContainer;
