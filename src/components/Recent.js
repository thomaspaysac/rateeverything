import {React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPersonalRatings } from '../functions';
import PagesDisplay from './multipage/PagesDisplay';

const Recent = (props) => {
  const [userRatings, setUserRatings] = useState();
  const [pagesNum, setPagesNum] = useState();
  const [test, setTest] = useState([1,2,3]);

  const urlParams = useParams();

  const fetchRatings = async () => {
    const data = await getPersonalRatings(urlParams.username);
    setUserRatings(data);
  }

  useEffect(() => {
    fetchRatings();
  }, [])

  return (
    <div className='content-page'>
      <div className='content-wrapper'>
        <div className='bolded'>{urlParams.username}'s recent ratings</div>
        <div className='recent_page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userRatings} range={2} />
        </div>
      </div>
    </div>
  );
}

export default Recent;
