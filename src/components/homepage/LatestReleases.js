import React from 'react';
import { Link } from 'react-router-dom';

const List = ({item}) => {
  if (!item) {
    return null
  } else {
    return (
      <div className='new-release_container'>
        <div className='new-release_image'>
        </div>
        <div className='new-release_info'>
          <Link to={`/release/${item.artist}/${item.albumID}`}>{item.release} {item.year}</Link>
          <Link to={`/artist/${item.artist}`}>{item.artist}</Link>
          <div>{item.genres}</div>
        </div>
      </div>
    )
  }
}

const LatestReleases = ({releases}) => {
  return (
    <div className='homepage_releases'>
      <h2 className='homepage_section-header'>Latest added releases</h2>
      <div>
        {
          releases.map((el, i) => {
            return (
              <List key={`new-release_${i}`} item={el} i={i} />
            )
          })
        }
      </div>
    </div>
  );
}

export default LatestReleases;
