import {React, useState, useEffect} from 'react';
import { getAuth } from 'firebase/auth';
import { getReleaseByID, updateReleaseRating } from '../../functions';

const StarRating = (props) => {
  const [currRating, setCurrRating] = useState();
  const [hoverRating, setHoverRating] = useState(undefined);

  const getPersonalRating = () => {
    if (!props.ratings) {
      setCurrRating(null);
      return;
    } else {
      let personalRating;
      props.ratings.forEach(el => {
        if (el.username === props.username) {
          personalRating = el;
          setCurrRating(personalRating.rating);
        }
      });
    }
  }

  const loadCurrRating = () => {
    for (let i = +currRating; i <= 5; i += 0.5) {
      const nextStar = document.querySelector(`label[for='${i.toFixed(1)}']`);
        nextStar.className = '';
      }
      for (let i = 0; i < +currRating+0.5; i += 0.5) {
        const prevStar = document.querySelector(`label[for='${i.toFixed(1)}']`)
        prevStar.classList.add('active-star');
      }
  }

  useEffect(() => {
    getPersonalRating();
    loadCurrRating();
  }, [props.ratings, currRating])

  const starsHoverZero = (e) => {
    setHoverRating('---');
    const allLabels = document.querySelectorAll('label');
    allLabels.forEach(el => {
      el.className = '';
    })
  }
  
  const starsHover = (e) => {
    const hoveredRating = e.target.id;
    const selected = document.querySelector(`input[value='${hoveredRating}']`);
    if (selected) {
      setHoverRating(selected.value);
      const selectedLabel = document.querySelector(`label[for='${selected.value}']`);
      selectedLabel.classList.add('selected');
      for (let i = +selected.value; i <= 5; i += 0.5) {
        const nextStar = document.querySelector(`label[for='${i.toFixed(1)}']`);
        nextStar.className = '';
      }
      for (let i = 0; i < +selected.value; i += 0.5) {
        const prevStar = document.querySelector(`label[for='${i.toFixed(1)}']`)
        prevStar.classList.add('active-star');
      }
    }
  }

  const starsBlur = () => {
    setHoverRating(undefined);
    for (let i = +currRating; i <= 5; i += 0.5) {
    const nextStar = document.querySelector(`label[for='${i.toFixed(1)}']`);
      nextStar.className = '';
    }
    for (let i = 0; i < +currRating+0.5; i += 0.5) {
      const prevStar = document.querySelector(`label[for='${i.toFixed(1)}']`)
      prevStar.classList.add('active-star');
    }
  }

  const submitForm = async () => {
    const selected = document.querySelector('input[name=rating]:checked');
    const release = await getReleaseByID(props.releaseID);
    if (selected) {
      const rating = selected.value;
      updateReleaseRating(release, getAuth().currentUser.displayName, getAuth().currentUser.uid, rating);
    }
  }

  const displayRating = () => {
    if (!hoverRating) {
      if (!currRating) {
        return '---'
      } else {
        return currRating.toFixed(1);
      }
    } else {
      return hoverRating;
    }
  }

  return (
    <div className='stars-rating-component'>
      <form id='rating-form' onClick={submitForm} onMouseLeave={starsBlur}>
        <input type='radio' name='rating' id='0.0' value='0.0' />
        <label htmlFor='0.0' onMouseEnter={starsHoverZero}>&nbsp;&nbsp;</label>
        <input type='radio' name='rating' id='0.5' value='0.5' />
        <label htmlFor='0.5' onMouseEnter={starsHover}>
          <svg id="0.5" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill="#8c8d90">
              <path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" />
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='1.0' value='1.0' />
        <label htmlFor='1.0' onMouseEnter={starsHover} >
          <svg id="1.0" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill='#8c8d90'>
              <path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/>
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='1.5' value='1.5' />
        <label htmlFor='1.5' onMouseEnter={starsHover} >
          <svg id="1.5" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill="#8c8d90">
              <path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" />
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='2.0' value='2.0' />
        <label htmlFor='2.0' onMouseEnter={starsHover} >
          <svg id="2.0" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill='#8c8d90'>
              <path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/>
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='2.5' value='2.5' />
        <label htmlFor='2.5' onMouseEnter={starsHover} >
          <svg id="2.5" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill="#8c8d90">
              <path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" />
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='3.0' value='3.0' />
        <label htmlFor='3.0' onMouseEnter={starsHover} >
          <svg id="3.0" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill='#8c8d90'>
              <path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/>
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='3.5' value='3.5' />
        <label htmlFor='3.5' onMouseEnter={starsHover} >
          <svg id="3.5" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill="#8c8d90">
              <path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" />
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='4.0' value='4.0' />
        <label htmlFor='4.0' onMouseEnter={starsHover} >
          <svg id="4.0" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill='#8c8d90'>
              <path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/>
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='4.5' value='4.5' />
        <label htmlFor='4.5' onMouseEnter={starsHover} >        
          <svg id="4.5" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill="#8c8d90">
              <path className="cls-1" d="M 61.597 0.068 C 61.775 0.222 61.438 96.1 61.438 96.1 L 27.083 116.64 C 25.573 117.555 23.605 117.066 22.7 115.55 C 22.265 114.837 22.133 113.981 22.33 113.17 L 31.244 74.17 L 1.09 47.88 C -0.228 46.711 -0.37 44.703 0.771 43.36 C 1.375 42.741 2.197 42.382 3.062 42.36 L 42.8 38.8 L 58.516 2 C 59.854 0.547 60.571 -0.821 61.597 0.068 Z" />
              </g>
          </svg>
        </label>
        <input type='radio' name='rating' id='5.0' value='5.0' />
        <label htmlFor='5.0' onMouseEnter={starsHover} >
          <svg id="5.0" data-name="Layer 1" viewBox="0 -0.147 61.535 117.247" xmlns="http://www.w3.org/2000/svg">
              <g fill='#8c8d90'>
              <path className="cls-1" d="M 61.597 116.819 C 61.775 116.665 61.438 20.787 61.438 20.787 L 27.083 0.247 C 25.573 -0.668 23.605 -0.179 22.7 1.337 C 22.265 2.05 22.133 2.906 22.33 3.717 L 31.244 42.717 L 1.09 69.007 C -0.228 70.176 -0.37 72.184 0.771 73.527 C 1.375 74.146 2.197 74.505 3.062 74.527 L 42.8 78.087 L 58.516 114.887 C 59.854 116.34 60.571 117.708 61.597 116.819 Z" transform="matrix(-1, 0, 0, -1, 61.649184, 116.886928)"/>
              </g>
          </svg>
        </label>
      </form>

      <div className='displayed-rating'>
        {displayRating()}
      </div>
    </div>
  );
}

export default StarRating;
