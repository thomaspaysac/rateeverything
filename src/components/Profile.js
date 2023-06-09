import React from "react";

const ProfilePage = (props) => {
  return (
    <div>
      <div>Hello {props.username}</div>
      <button onClick={props.sendPrivateData}>
        Send info to server: private
      </button>
      <button onClick={props.addRelease}>
        Send release
      </button>
    </div>
  )
}

export default ProfilePage;