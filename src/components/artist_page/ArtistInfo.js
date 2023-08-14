import { React } from 'react';

const ArtistInfo = (props) => {
  return (
    <div>
      <div className="artist_name">
        <div className='bolded'>{props.artist}</div>
        <div className="artist-id">[Artist{props.artistID}]</div>
      </div>
      <table className="artist-info_table">
        <tbody>
          <div className="datagroup">
            <tr>
              <td className="artist-table_label">Formed</td>
            </tr>
            <tr>
              <td className="artist-table_data">{props.formed}, {props.country}</td>
            </tr>
          </div>
          <div className="datagroup">
            <tr>
              <td className="artist-table_label">Genres</td>
            </tr>
            <tr>
              <td className="artist-table_data genres-list">{props.genres}</td>
            </tr>
          </div>
        </tbody>
      </table>
    </div>
  );
}

export default ArtistInfo;