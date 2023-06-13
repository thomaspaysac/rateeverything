import { React, useState } from "react";
import "C:/Users/paysa/Documents/GitHub/rateeverything/src/App.css";

const ReleaseInfo = (props) => {
  return (
    <div className="release-info_main release_right-col-element">
      <div className="release-title">
        <div>{props.title}</div>
        <div className="release-id">[{props.id}]</div>  
      </div>
      <div className="separator"></div>
      <table className="album-info">
        <tbody>
          <tr>
            <td className="table-label">Artist</td>
            <td>{props.artist}</td>
          </tr>
          <tr>
            <td className="table-label">Type</td>
            <td>{props.type}</td>
          </tr>
          <tr>
            <td className="table-label">Released</td>
            <td>{props.date}</td>
          </tr>
          <tr>
            <td className="table-label">RYS Rating</td>
            <td>{props.generalRating}</td>
          </tr>
          <tr>
            <td className="table-label">Genres</td>
            <td className="artist-table_data genres-list">{props.genres.map((el, i) => {
              return <span key={el}>{el}</span>
              })
              }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ReleaseInfo;