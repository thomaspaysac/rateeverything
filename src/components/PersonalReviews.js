import {React, useState, useEffect} from 'react';
import { useParams, Link } from 'react-router-dom';
import PagesDisplay from './multipage/PagesDisplay';
import { getPersonalReviews } from '../functions';

const ReviewsList = ({reviews}) => {
  if (reviews) {
    return (
      reviews.map((el, i) => {
        const separatedDate = el.reviewDate.split(' ');
        return (
          <div key={`review-${i}`} className="review-item">
              <div className='review_release-info'>
                <div className='recent-rating_thumbnail'>
                  <img src={el.release.imagePath} alt="cover art" />
                </div>
                <div className='recent-rating_date bolded'>
                  <div>{separatedDate[0]}</div> 
                  <div>{separatedDate[1]}</div> 
                  <div>{separatedDate[2]}</div>
                </div>
                <div><Link to={`/artist/${el.release.artist}`} className='bolded'>{el.release.artist}</Link>
                  &nbsp; - &nbsp;
                <Link to={`/release/${el.release.artist}/${el.release.releaseID}`}>{el.release.title}</Link> <span className='lists_date'>&nbsp;({el.release.year})</span></div>
              </div>
              <div className='review-page_content'>
                <div className='review_block'></div>
                <div className='review-page_review-text'>{el.review}</div>
              </div>
            </div>
        )
      })
    )
  }
}

const PersonalReviews = () => {
  const [userReviews, setUserReviews] = useState();
  const [displayedItems, setDisplayedItems] = useState();

  const urlParams = useParams();

  const fetchCollection = async () => {
    const data = await getPersonalReviews(urlParams.username);
    const sortedData = data.sort((a, b) => (a.reviewDate < b.reviewDate) ? 1 : (a.reviewDate > b.reviewDate) ? -1 : 0);
    setUserReviews(sortedData);
    console.log(data);
    setDisplayedItems(sortedData.slice(0, 25))
  }

  useEffect(() => {
    document.title = `${urlParams.username}'s music - Evaluate Your Sounds`
    fetchCollection();
  }, [])

  const loadPage = (i, range) => {
    setDisplayedItems(userReviews.slice((i * range), (i * range + range)))
  }

  return (
    <div className='content-page personal-reviews_page'>
      <div className='content-wrapper'>

      <div><Link to={`/profile/${urlParams.username}`}>{urlParams.username}</Link> {'>'} <span className="bolded">{urlParams.username}'s reviews</span></div>


        <div className='page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userReviews} range={25} loadPage={loadPage} />
        </div>

        <div className='recent-page_ratings'>
          <div className='recent_header'>
            <div className='recent_header-item'>Art</div>
            <div className='recent_header-item'>Date&nbsp;/&nbsp;</div>
            <div className='recent_header-item'>Rating</div>
            <div className='recent_header-item'>Artist / Release (Release date)</div>
          </div>
          <ReviewsList reviews={displayedItems} />
        </div>

        <div className='page-selector'>
          <div className='bolded'>Page</div>
          <PagesDisplay items={userReviews} range={25} loadPage={loadPage} />
        </div>

      </div>
    </div>
  );
}

export default PersonalReviews;
