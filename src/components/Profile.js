import React from "react";

const ProfilePage = (props) => {
  return (
    <div>
      <div>Hello {props.username}</div>
      <button onClick={props.addRelease}>
        Submit album
      </button>
        <button onClick={props.addArtist}>
        Submit artist
        </button>
    </div>
  )
}

export default ProfilePage;