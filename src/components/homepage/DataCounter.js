import {React, useState, useEffect} from 'react';
import { getCollLength, getAllReleasesLength, getRatingsCounter, getReviewsCounter, getListsCounter } from '../../functions';

const DataCounter = () => {
  const [dataCounter, setDataCounter] = useState();

  const loadDataCounter = async () => {
    const artists = await getCollLength();
    const releases = await getAllReleasesLength();
    const ratings = await getRatingsCounter();
    const reviews = await getReviewsCounter();
    const lists = await getListsCounter();
    const data = {
      artists: artists,
      releases: releases,
      ratings: ratings,
      reviews: reviews,
      lists: lists,
    }
    setDataCounter(data);
  }

  useEffect(() => {
    loadDataCounter();
  }, [dataCounter])


  if (dataCounter) {
    return (
      <div className='data-counter_container'>
          <div className='bolded'><span className='greyed-text'>{dataCounter.artists}</span> Artists</div>
          <div className='bolded'><span className='greyed-text'>{dataCounter.releases}</span> Releases</div>
          <div className='bolded'><span className='greyed-text'>{dataCounter.ratings}</span> Ratings</div>
          <div className='bolded'><span className='greyed-text'>{dataCounter.reviews}</span> Reviews</div>
          <div className='bolded'><span className='greyed-text'>{dataCounter.lists}</span> Lists</div>
      </div>
  );
  } else {
    return (
      <div className='data-counter_container'>
          <div className='bolded'><span className='greyed-text'></span> Artists</div>
          <div className='bolded'><span className='greyed-text'></span> Releases</div>
          <div className='bolded'><span className='greyed-text'></span> Ratings</div>
          <div className='bolded'><span className='greyed-text'></span> Reviews</div>
          <div className='bolded'><span className='greyed-text'></span> Lists</div>
      </div>
    )
  }
  
}

export default DataCounter;
