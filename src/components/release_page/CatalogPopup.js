import React from 'react';
import { getAuth } from 'firebase/auth';
import { updateCollection } from '../../functions';
import discIcon from '../../../src/img/vinyl.png';

const CatalogPopup = ({releaseID}) => {
  const popup = document.querySelector('.catalog-popup');

  const openPopup = () => {
    popup.style.display = 'flex';
  }

  const closePopup = () => {
    popup.style.display = 'none';
  }

  return (
    <div onMouseEnter={openPopup} onMouseLeave={closePopup}>
      <div className="catalog-container" >
        <img src={discIcon} alt='' /> Catalog
      </div>
      <div className='catalog-popup'>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'collection')}>In collection</div>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'wishlist')}>On wishlist</div>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'remove')}>(not cataloged)</div>
      </div>
    </div>

  );
}

export default CatalogPopup;
