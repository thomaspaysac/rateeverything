import {React} from 'react';
import { useNavigate } from 'react-router-dom';
import searchIcon from '../img/search.png';

const SearchEngine = () => {
  const navigateTo = useNavigate();

  const backdrop = document.getElementById('backdrop');
  const choices = document.querySelector('.search-engine_category');

  const displayChoices = () => {  
      choices.style.display = 'flex';
      backdrop.style.display = 'block';
      backdrop.addEventListener('click', () => {
        choices.style.display = 'none';
        backdrop.style.display = 'none';
      })
  }

  const submitSearch = (e) => {
    //e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const searchterm = data.searchterm;
    const searchcategory = data.searchcategory;
    backdrop.style.display = 'none';
    choices.style.display = 'none';
    navigateTo(`/search/${searchcategory}/${searchterm}`);
  }

  return (
    <div className="header_searchbar">
        <form onSubmit={submitSearch}>
          <img src={searchIcon} alt='search' id='searchbar-icon' />
          <input onFocus={displayChoices} type="text" name="searchterm" placeholder="Search..." autoComplete='off'/>
          <div className='search-engine_category'>
            Search:
            <input type="radio" name="searchcategory" id="artists" value="artists" defaultChecked />
            <label htmlFor='artists'>Artists</label>
            <input type="radio" name="searchcategory" id="releases" value="releases" />
            <label htmlFor='releases'>Releases</label>
          </div>
        </form>
      </div>
  );
}

export default SearchEngine;
