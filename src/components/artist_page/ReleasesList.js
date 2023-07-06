import { React, useState, useEffect } from 'react';
import { Link } from "react-router-dom";


const ReleasesList = (props) => {
  return (
    <div className='releases-type_container'>
      <h2>Discography</h2>
      <div className='discography'>
        <div className='release-type'>Album</div>
        <table className='releases-list_table'>
          <thead className='releases-list_thead'>
            <tr className='release-list_labels'>
              <th className='art_thumbnail'> </th>
              <th className='th-title'>Title / Release Date</th>
              <th className='th-fixed'>Reviews</th>
              <th className='th-fixed'>Ratings</th>
              <th className='th-fixed'>Average</th>
            </tr>
          </thead>
          <tbody>
            {props.releases.map(el => {
              return (
                <tr key={el.artist + '_' + el.release} className='release-list_release'>
                  <td key='release_image' className='art_thumbnail'>
                    <div className='art_thumbnail_container'>
                      <img src={el.imagePath} alt='cover art' />
                    </div>
                  </td>
                  <td>
                    <div key='release_title' className={`release-table_title ${el.average > 3.70 ? "bolded" : ""}`}><Link to={`/release/${el.artist}/${el.albumID}`}>{el.release}</Link></div>
                    <div key='release_year' className='release-table_year greyed-info'>{el.year}</div>
                  </td>
                  <td key='release_reviews' className='td-fixed release-table_reviews greyed-info'>{el.reviews.length}</td>
                  <td key='release_ratings' className='td-fixed release-table_ratings greyed-info'>{el.ratings.length}</td>
                  <td key='release_average' className='td-fixed release-table_average bolded'>{el.average}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

export default ReleasesList;
