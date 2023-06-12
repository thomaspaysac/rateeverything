import { React, useState, useEffect } from "react";
import { getArtistsList } from "../functions";
import { Link } from "react-router-dom";

const ProfilePage = (props) => {
  const [ artistsList, setArtistsList ] = useState([]);

  const getList = async () => {
    const data = await getArtistsList();
    setArtistsList(data);
  }

  useEffect(() => {
    getList()
  }, [])

  return (
    <div>
      <div>Hello {props.username}</div>
      <button onClick={props.addRelease}>
        Submit album
      </button>
        <button onClick={props.addArtist}>
        Submit artist
        </button>
        <div>{artistsList.map((item) => {
      return (
        <Link to={`/artist/${item}`} key={item}>
            {item}
        </Link>
      );
    })}</div>
    </div>
  )
}

export default ProfilePage;