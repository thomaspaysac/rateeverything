import { React, useState, useEffect } from "react";
import { getArtistsList, getAllReleases, getAllReleasesLength } from "../functions";
import { Link } from "react-router-dom";

const ProfilePage = (props) => {
  const [artistsList, setArtistsList] = useState([]);
  const [releasesList, setReleasesList] = useState([]);

  const getReleases = async () => {
    const data = await getAllReleases();
    setReleasesList(data);
  }

  const getList = async () => {
    const data = await getArtistsList();
    setArtistsList(data);
  }

  useEffect(() => {
    getReleases()
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
      <button onClick={() => getAllReleasesLength()}>
        Log
      </button>

        <div>{artistsList.map((el) => {
      return (
        <Link to={`/artist/${el}`} key={el}>
            {el}
        </Link>
      );
    })}</div>

    <div>
      <Link to='/artist/add_artist'>Add new artist</Link>
    </div>

    </div>
  )
}

export default ProfilePage;