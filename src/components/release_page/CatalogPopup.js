import {React, useState, useEffect} from 'react';
import { getAuth } from 'firebase/auth';
import { updateCollection, getUserInfo } from '../../functions';
import discIcon from '../../../src/img/vinyl.png';

const CatalogPopup = ({releaseID, username}) => {
  const [catalogStatus, setCatalogStatus] = useState();
  const [userCollection, setUserCollection] = useState();
  const [userWishlist, setUserWishlist] = useState();

  const loadUserCatalog = async () => {
    if (!username) {
      return null;
    } else {
      const data = await getUserInfo(username);
      //setCatalogStatus(data);
      setUserCollection(data.collection);
      setUserWishlist(data.wishlist);
    }
  }

  const findInCollection = () => {
    if (!userCollection || !releaseID) {
      return null;
    } else {
      const existingData = userCollection.find((obj) => obj.release.releaseID === releaseID);
      if (existingData) {
        return true;
      } else {
        return false;
      }
    }
  }

  const findInWishlist = () => {
    if (!userWishlist || !releaseID) {
      return null;
    } else {
      const existingData = userWishlist.find((obj) => obj.release.releaseID === releaseID);
      if (existingData) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  const popup = document.querySelector('.catalog-popup');

  const openPopup = () => {
    popup.style.display = 'flex';
  }

  const closePopup = () => {
    popup.style.display = 'none';
  }

  useEffect(() => {
    loadUserCatalog();
  }, [username])

  useEffect(() => {
    if (findInCollection()) {
      setCatalogStatus('collection');
    } else if (findInWishlist()) {
      setCatalogStatus('wishlist');
    } else {
      setCatalogStatus(undefined);
    }
  }, [userCollection, userWishlist, releaseID, catalogStatus])

  const catalogButton = () => {
    if (catalogStatus === 'collection') {
        return (
          <div className="catalog-container cataloged">
            <img src={discIcon} alt='' /> In collection
          </div>
        )
    } else if (catalogStatus === 'wishlist') {
      return (
        <div className="catalog-container cataloged">
          <img src={discIcon} alt='' /> On wishlist
        </div>
      )
    } else {
      return (
        <div className="catalog-container">
          <img src={discIcon} alt='' /> Catalog
        </div>
      )
    }
  }

  return (
    <div onMouseEnter={openPopup} onMouseLeave={closePopup}>
      {catalogButton()}
      <div className='catalog-popup'>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'collection')}>In collection</div>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'wishlist')}>On wishlist</div>
        <div onClick={() => updateCollection(getAuth().currentUser.displayName, releaseID, 'remove')}>(not cataloged)</div>
      </div>
    </div>

  );
}

export default CatalogPopup;
