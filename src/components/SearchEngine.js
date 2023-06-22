import {React, useState} from 'react';
import { useNavigate } from 'react-router-dom';

const SearchEngine = () => {
  const [searchCategory, setSearchCategory] = useState('artist');
  const navigateTo = useNavigate();

  const displayChoices = () => {
    const backdrop = document.getElementById('backdrop');
    const choices = document.querySelector('.search-engine_category');
      choices.style.display = 'flex';
      backdrop.style.display = 'block';
      backdrop.addEventListener('click', () => {
        choices.style.display = 'none';
        backdrop.style.display = 'none';
      })

    
  }

  const submitSearch = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const searchterm = data.searchterm;
    console.log(data)
    navigateTo(`/search/${searchCategory}/${searchterm}`);
  }

  return (
    <div className="header_searchbar">
        <form onSubmit={submitSearch}>
          <input onFocus={displayChoices} type="text" name="searchterm" placeholder="Search..." />
          <div className='search-engine_category'>
            <label htmlFor='artists'>Artists</label>
            <input type="radio" name="searchcategory" id="artists" value="artists" defaultChecked />
            <label htmlFor='releases'>Releases</label>
            <input type="radio" name="searchcategory" id="releases" value="releases" />
          </div>
        </form>
      </div>
  );
}

export default SearchEngine;
