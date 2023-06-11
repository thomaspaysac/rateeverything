import { React } from 'react';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { getReleases, getArtist } from '../../functions';

const data = await getReleases('Metallica');

const AlbumList = data.map((el) => {
  return (
  <tr key={el.artist + '_' + el.release} className='release-list_release'>
    <td key = 'release_image'>
      O
    </td>
    <td>
      <div key='release_title' className='release-table_title'><Link to="/">{el.release}</Link></div>
      <div key='release_year' className='release-table_year'>{el.year}</div>
    </td>
    <td key='release_reviews' className='td-fixed release-table_reviews'>{el.reviews.length}</td>
    <td key='release_ratings' className='td-fixed release-table_ratings'>{el.ratings.length}</td>
    <td key='release_average' className='td-fixed release-table_average'>{el.average.toFixed(2)}</td>
  </tr>
  )
});



const ReleasesList = () => {
  return (
    <div className='releases-type_container'>
      <h2>Discography</h2>
      <div className='discography'>
        <div className='release-type'>Album</div>
        <table className='releases-list_table'>
          <thead className='releases-list_thead'>
            <tr className='release-list_labels'>
              <th> </th>
              <th className='th-title'>Title / Release Date</th>
              <th className='th-fixed'>Reviews</th>
              <th className='th-fixed'>Ratings</th>
              <th className='th-fixed'>Average</th>
            </tr>
          </thead>
          <tbody>
            {AlbumList}
          </tbody>
        </table>
      </div>
    </div>
    
  );
}

/*<div className='disco-header'>
<div>Title / Release Date</div>
<div>Reviews</div>
<div>Ratings</div>
<div>Average</div>
</div>
<div className='disco-list'>
<div>
  {AlbumList}
</div>
</div>*/

export default ReleasesList;
