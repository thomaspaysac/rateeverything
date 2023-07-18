import {React, useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import PagesDisplay from './multipage/PagesDisplay';
import { getWishlist } from '../functions';

const DisplayWishlist = ({display}) => {
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

const Wishlist = () => {
  const [userWishlist, setUserWishlist] = useState();
  const [displayedItems, setDisplayedItems] = useState();

  const urlParams = useParams();

  const fetchCollection = async () => {
    const data = await getWishlist(urlParams.username);
    const sortedData = data.sort((a, b) => (a.date < b.date) ? 1 : (a.date > b.date) ? -1 : 0);
    setUserWishlist(sortedData);
    setDisplayedItems(sortedData.slice(0, 25))
  }

  useEffect(() => {
    document.title = `${urlParams.username}'s music - Evaluate Your Sounds`
    fetchCollection();
  }, [])

  const loadPage = (i, range) => {
    setDisplayedItems(userWishlist.slice((i * range), (i * range + range)))
  }

  return (
    <div className='content-page recent-page'>
      <div className='content-wrapper'>
        <div><Link to={`/profile/${urlParams.username}`}>{urlParams.username}</Link> {'>'} <span className="bolded">{urlParams.username}'s wishlist</span></div>
        <div className='recent_page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userWishlist} range={25} loadPage={loadPage} />
        </div>

        <div className='recent-page_ratings'>
          <div className='recent_header'>
            <div className='recent_header-item'>Art</div>
            <div className='recent_header-item'>Date&nbsp;/&nbsp;</div>
            <div className='recent_header-item'>Rating</div>
            <div className='recent_header-item'>Artist / Release (Release date)</div>
          </div>
          <DisplayWishlist display={displayedItems} />
      </div>

      <div className='recent_page-selector'>
        <div className='bolded'>Page</div>
        <PagesDisplay items={userWishlist} range={25} loadPage={loadPage} />
      </div>

      </div>
    </div>
  );
}

export default Wishlist;
