import {React, useState, useEffect} from 'react';
import { getCollLength, getAllReleasesLength } from '../../functions';

const DataCounter = () => {
  const [dataCounter, setDataCounter] = useState();

  const loadDataCounter = async () => {
    const artists = await getCollLength();
    const releases = await getAllReleasesLength();
    const data = {
      artists: artists,
      releases: releases,
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
          <div className='bolded'><span className='greyed-text'>X</span> Ratings</div>
          <div className='bolded'><span className='greyed-text'>X</span> Reviews</div>
          <div className='bolded'><span className='greyed-text'>X</span> Lists</div>
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
