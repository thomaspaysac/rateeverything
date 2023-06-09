import React from 'react';
import { getArtist } from '../../functions';

const data = await getArtist('Metallica');
console.log(data);

const ArtistInfo = (props) => {
  return (
    <div>
      <div className="artist_name">
        <div>{data.artist}</div>
        <div className="artist-id">[Artist{data.artistID}]</div>
        <div>
          <div>Formed</div>
          <div>{data.formed}, {data.country}</div>
        </div>
        <div>
          <div>Genres</div>
          <div>{data.genres}</div>
        </div>
      </div>
    </div>
  );
}

export default ArtistInfo;