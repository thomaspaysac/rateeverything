import { React } from "react";
import { Link } from "react-router-dom";

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
            <td><Link to={`/artist/${props.artist}`} className="bolded">{props.artist}</Link></td>
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
            <td><span className="release-info_average bolded">{props.generalRating}</span> <span className="release-info_average_secondary">/ 5.0 from <span className="bolded release-info_average_secondary">{props.ratingsNumber}</span> ratings</span></td>
          </tr>
          <tr>
            <td className="table-label">Genres</td>
            <td className="artist-table_data genres-list">{props.genres}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default ReleaseInfo;