import {React, useState, useEffect} from 'react';

const individualRating = (rating, array) => {
  if (array) {
    return (
      <div>
        <div>{rating} {array.length}</div>
      </div>
    )
  }
}

const PersonalRatings = (props) => {
  const [ratingsArray, setRatingsArray] = useState([]);

  const getReleasesByRating = () => {
    const data = props.userRatings;
    const rating9 = data.find(({ rating }) => rating === "5.0");
    const rating8 = data.find(({ rating }) => rating === "4.5");
    const rating7 = data.find(({ rating }) => rating === "4.0");
    const rating6 = data.find(({ rating }) => rating === "3.5");
    const rating5 = data.find(({ rating }) => rating === "3.0");
    const rating4 = data.find(({ rating }) => rating === "2.5");
    const rating3 = data.find(({ rating }) => rating === "2.0");
    const rating2 = data.find(({ rating }) => rating === "1.5");
    const rating1 = data.find(({ rating }) => rating === "1.0");
    const rating0 = data.find(({ rating }) => rating === "0.5");
    const allRatings = [rating0, rating1, rating2, rating3, rating4, rating5, rating6, rating7, rating8, rating9];
    setRatingsArray(allRatings); 
  }

  useEffect(() => {
    getReleasesByRating();
    console.log(ratingsArray);
  }, [])

  return (
    <div className='personalRatings-component'>
      <div className='bolded'>Ratings: {props.userRatings.length}</div>
      <div className='ratings-listing'>
        <div className='ratings-listing_score'>
          {individualRating('5', ratingsArray)}
        </div>
        <div className='ratings-listing_score'>
          4.5
        </div>
        <div className='ratings-listing_score'>
          4.0
        </div>
        <div className='ratings-listing_score'>
          3.5
        </div>
        <div className='ratings-listing_score'>
          3.0
        </div>
        <div className='ratings-listing_score'>
          2.5
        </div>
        <div className='ratings-listing_score'>
          2.0
        </div>
        <div className='ratings-listing_score'>
          1.5
        </div>
        <div className='ratings-listing_score'>
          1.0
        </div>
        <div className='ratings-listing_score'>
          0.5
        </div>
      </div>
    </div>
  );
}

export default PersonalRatings;
