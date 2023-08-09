import React from 'react';
import { Link } from 'react-router-dom';

const List = ({item}) => {
  if (!item) {
    return null
  } else {
    return (
      <div className='new-release_container'>
        <div className='new-release_image'>
          <img src={item.imagePath} alt='' />
        </div>
        <div className='new-release_info'>
          <div>
            <Link to={`/release/${item.artist}/${item.albumID}`}>{item.release} <span className='lists_date'>({item.year})</span></Link>
          </div>
          <div>
            <Link to={`/artist/${item.artist}`} className='bolded'>{item.artist}</Link>
          </div>
          <div className='greyed-info'>
            {item.genres.join(', ')}
          </div>
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
