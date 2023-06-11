import { React, useState, useEffect } from 'react';
import { getArtist } from '../../functions';

/*const data = await getArtist('Metallica');*/

const ArtistInfo = (props) => {
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    const fetchData = async (artist) => {
      const data = await getArtist(artist);
      setGenres(data.genres);
    };
    fetchData('Metallica');
  }, [])  

  return (
    <div>
      <div className="artist_name">
        <div>{props.artist}</div>
        <div className="artist-id">[Artist{props.artistID}]</div>
      </div>
      <table className="artist-info_table">
        <tbody>
          <tr>
            <td className="artist-table_label">Formed</td>
          </tr>
          <tr>
            <td className="artist-table_data">{props.formed}, {props.country}</td>
          </tr>
          <tr>
            <td className="artist-table_label">Genres</td>
          </tr>
          <tr>
            <td className="artist-table_data genres-list">{genres.map((el, i) => {
              return <span key={el}>{el}</span>
              })
              }</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ArtistInfo;