import {React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getPersonalRatings } from '../functions';
import PagesDisplay from './multipage/PagesDisplay';
import StarsDisplay from './multipage/StarsDisplay';

const Ratings = ({userRatings}) => {
  if (userRatings) {
      return (
        userRatings.map((el, i) => {
          const separatedDate = el.date.split(' ');
          return (
            <div key={`recent-${i}`} className="recent-page_item">
              <div className='recent-rating_thumbnail'>
                <img src={el.release.imagePath} alt="cover art" />
              </div>
              <div className='recent-rating_date'>
                <div>{separatedDate[0]}</div> 
                <div>{separatedDate[1]}</div> 
                <div>{separatedDate[2]}</div>
              </div>
              <div className='rating_stars-display'><StarsDisplay key={`rating-${i}`} rating={el.rating} /></div>
              <div className='recent_release-info'><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                &nbsp; - &nbsp;
              <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link> <span className='lists_date'>&nbsp;({el.release.year})</span></div>
            </div>
          )
        })
      )
  }
}

const Recent = () => {
  const [userRatings, setUserRatings] = useState();
  const [displayedRatings, setDisplayedRatings] = useState();

  const urlParams = useParams();

  const fetchRatings = async () => {
    const data = await getPersonalRatings(urlParams.username);
    const sortedData = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setUserRatings(sortedData);
    setDisplayedRatings(sortedData.slice(0, 25))
  }

  useEffect(() => {
    document.title = `${urlParams.username}'s music - Evaluate Your Sounds`
    fetchRatings();
  }, [])

  const loadPage = (i, range) => {
    setDisplayedRatings(userRatings.slice((i * range), (i * range + range)))
  }

  return (
    <div className='content-page recent-page'>
      <div className='content-wrapper'>
        <div><Link to={`/profile/${urlParams.username}`}>{urlParams.username}</Link> {'>'} <span class="bolded">{urlParams.username}'s recent ratings</span></div>
        <div className='recent_page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userRatings} range={25} loadPage={loadPage} />
        </div>

        <div className='recent-page_ratings'>
          <div className='recent_header'>
            <div className='recent_header-item'>Art</div>
            <div className='recent_header-item'>Date&nbsp;/&nbsp;</div>
            <div className='recent_header-item'>Rating</div>
            <div className='recent_header-item'>Artist / Release (Release date)</div>
          </div>
          <Ratings userRatings={displayedRatings} />
      </div>

      <div className='recent_page-selector'>
        <div className='bolded'>Page</div>
        <PagesDisplay items={userRatings} range={25} loadPage={loadPage} />
      </div>

      </div>
    </div>
  );
}

export default Recent;
