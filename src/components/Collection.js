import {React, useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import PagesDisplay from './multipage/PagesDisplay';
import { getCollection } from '../functions';

const DisplayCollection = ({display}) => {
  if (display) {
      return (
        display.map((el, i) => {
          return (
            <div key={`collection-${i}`} className="collection-item">
              <div className='recent-rating_thumbnail'>
                <img src={el.release.imagePath} alt="cover art" />
              </div>
              <div className='recent-rating_date bolded'>{el.date}</div>
              <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                &nbsp; - &nbsp;
              <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link></div>
            </div>
          )
        })
      )
  }
}

const Collection = () => {
  const [userCollection, setUserCollection] = useState();
  const [displayedItems, setDisplayedItems] = useState();

  const urlParams = useParams();

  const fetchCollection = async () => {
    const data = await getCollection(urlParams.username);
    const sortedData = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setUserCollection(sortedData);
    setDisplayedItems(sortedData.slice(0, 25))
  }

  useEffect(() => {
    fetchCollection();
  }, [])

  const loadPage = (i, range) => {
    setDisplayedItems(userCollection.slice((i * range), (i * range + range)))
  }

  return (
    <div className='content-page recent-page'>
      <div className='content-wrapper'>
        <div className='bolded'>{urlParams.username}'s owned releases</div>
        <div className='recent_page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userCollection} range={25} loadPage={loadPage} />
        </div>

        <div className='recent-page_ratings'>
          <div className='recent_header'>
            <div className='recent_header-item'>Art</div>
            <div className='recent_header-item'>Date&nbsp;/&nbsp;</div>
            <div className='recent_header-item'>Rating</div>
            <div className='recent_header-item'>Artist / Release (Release date)</div>
          </div>
          <DisplayCollection display={displayedItems} />
      </div>

      <div className='recent_page-selector'>
        <div className='bolded'>Page</div>
        <PagesDisplay items={userCollection} range={25} loadPage={loadPage} />
      </div>

      </div>
    </div>
  );
}

export default Collection;
