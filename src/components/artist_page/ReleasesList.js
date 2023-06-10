import { React } from 'react';
import { getReleases, getArtist } from '../../functions';

const data = await getReleases('Metallica');

const AlbumList = data.map((el) => {
  return (
  <div key={el.artist + '_' + el.release} className='release-list_release'>  
    <div>
      <div key='release-name'>{el.release}</div>
      <div key='year'>{el.year}</div>
    </div>
    <div key='release_reviews'>{el.reviews.length}</div>
    <div key='release_ratings'>{el.ratings.length}</div>
    <div key='release_average'>{el.average.toFixed(2)}</div>
  </div>
  )
});



const ReleasesList = () => {
  return (
    <div className='releases-type_container'>
      <h2>Discography</h2>
      <div className='discography'>
        <div className='release-type'>Album</div>
        <div className='disco-header'>
          <div>Title / Release Date</div>
          <div>Reviews</div>
          <div>Ratings</div>
          <div>Average</div>
        </div>
        <div className='disco-list'>
          <div>
            {AlbumList}
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default ReleasesList;
