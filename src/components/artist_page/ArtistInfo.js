import { React, useState, useEffect } from 'react';

const ArtistInfo = (props) => {
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
            <td className="artist-table_data genres-list">{props.genres.map((el, i) => {
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