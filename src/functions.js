import { doc, collection, getCountFromServer, getFirestore, getDoc, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./firebase";
import format from "date-fns/format";

const userFirestoreSetup = async (userID, username) => {
    await setDoc(doc(db, 'users', userID), {
    username: username,
    ratings: [],
    reviews: [],
    date: format(new Date(), 'dd MMM yy'),
  });
}

const getUserInfo = async (userID) => {
  const userRef = doc(db, 'users', userID);
  const docSnap = await getDoc(userRef);
  const accountDate = docSnap.data().date;
  return accountDate;
}

const getCollLength = async () => {
  const coll = collection(db, 'artists');
  const snapshot = await getCountFromServer(coll);
  return snapshot.data().count;
}

const submitArtist = async (artist, formed, country, genres) => {
  const artistID = await getCollLength();
  const docRef = doc(db, 'artists', artist);
  try {
    const docSnap = await getDoc(docRef);
    if(docSnap.exists()) {
      console.log(docSnap.data());
  } else {
    await setDoc(doc(db, "artists", artist), {
      artistID: artistID,
      artist: artist,
      formed: formed,
      country: country,
      genres: genres,
      releases: [],
    })
  }
  } catch(error) {
    console.log(error)
  }
}

const submitRelease = async (artist, release, year, tracks, genres, ratings, reviews) => {
  const albumID = await getAllReleasesLength();
  const artistRef = doc(db, 'artists', artist);
  await updateDoc(artistRef, {
    releases: arrayUnion({
      artist: artist, 
      release: release,
      year: year,
      tracks: tracks,
      ratings: ratings,
      reviews: reviews,
      genres: genres,
      albumID: albumID,
      average: '',
    })
  })
}

const getArtistsList = async () => {
  const querySnapshot = await getDocs(collection(db, 'artists'));
  const list = [];
  querySnapshot.forEach((doc) => {
    list.push(doc.id);
  });
  return list;
}

const getAllArtistsData = async () => {
  const allArtists = [];
  const artists = await getArtistsList();
  for (const artist of artists) {
    const data = await getArtist(artist);
    allArtists.push(data);
  }
  return allArtists;
}

const getArtist = async (artist) => {
  const docRef = doc(db, 'artists', artist);
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  } catch(error) {
    console.log(error)
  }
}

const getReleases = async (artist) => {
  const data = await getArtist(artist);
  return data.releases;
}

const getAllReleases = async () => {
  const releasesListByArtist = [];
  const allReleasesList = [];
  const allArtists = await getAllArtistsData();
  for (const artist of allArtists) {
    releasesListByArtist.push(artist.releases)
  }
  for (const item of releasesListByArtist) {
    item.forEach(release => {
      allReleasesList.push(release)
    })
  }
  return allReleasesList;
}

const getAllReleasesLength = async () => {
  const releasesList = [];
  const allArtists = await getAllArtistsData();
  for (const artist of allArtists) {
    releasesList.push(artist.releases.length)
  }
  const length = releasesList.reduce((acc, curr) => acc + curr, 0);
  return length;
}

const getUniqueRelease = async (artist, releaseName) => {
  const data = await getArtist(artist);
  let targetIndex = undefined
  data.releases.map((el, i) => {
    if (el.release === releaseName) {
      targetIndex = i;
    }
  })
  return data.releases[targetIndex];
}

const getReleaseByID = async (targetID) => {
 const allReleases = await getAllReleases();
 let targetIndex = undefined;
 allReleases.map((el, i) => {
  if (el.albumID === targetID) {
    targetIndex = i;
  }
 })
 return allReleases[targetIndex];
}

const updateReleaseRating = async (releaseID, username, userID, rating) => {
  // Get the artistRef from the album ID
  const artistRef = doc(db, 'artists', releaseID.artist);
  // Get album index from the "release" array
  const docSnap = await getDoc(artistRef);
  const data = docSnap.data();
  let index = 0;
  let targetIndex = undefined;
  for (const item of data.releases) {
    if (releaseID.albumID !== item.albumID) {
      index++;
    } else {
      targetIndex = index;
    }
  }
  // Use local copy before sending the data back to modify nested ratings array
  const localCopy = data;
  const localRatings = localCopy.releases[targetIndex].ratings;
  const ratingDate = format(new Date(), 'dd MMM yy');
  // if user has already rated the release, replace the rating
  const userRatingObject = localRatings.find((obj) => obj.userID === userID);
  if (!userRatingObject && +rating !== 0) {
    localRatings.push({
      username: username,
      userID: userID,
      rating: +rating,
      date: ratingDate,
    })
  } else if (+rating === 0) {
    // if the rating is 0, find the rating and remove it from the array
    let index = 0;
    let targetIndex = undefined;
    for (const rating of localRatings) {
      if (rating.userID !== userID) {
        index++;
      } else {
        targetIndex = index;
      }
    }
    localRatings.splice(targetIndex, 1);
  } else {
    userRatingObject.rating = +rating;
    userRatingObject.date = ratingDate;
  }
  // Update average rating
  const ratingsSum = localRatings.reduce((acc, el) => {return acc + el.rating;}, 0);
  const averageRating = +(ratingsSum / localRatings.length).toFixed(2);
  localCopy.releases[targetIndex].average = averageRating;
  await updateDoc(artistRef, localCopy);
  linkRatingToUser(userID, releaseID, rating, ratingDate);
}

const linkRatingToUser = async (userID, release, rating, date) => {
  const userRef = doc(db, 'users', userID);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();
  const localCopy = data;
  const localRatings = data.ratings;
  const existingRating = localRatings.find((obj) => obj.release.albumID === release.albumID);
  if (existingRating === undefined && +rating !== 0) {
    localRatings.push({
      release: release,
      rating: rating,
      date: date,
    })
  } else if (+rating === 0) {
    let index = 0;
    let targetIndex = undefined;
    for (const rating of localRatings) {
      if (rating.release !== release) {
        index++;
      } else {
        targetIndex = index;
      }
    }
    localRatings.splice(targetIndex, 1);
  } else {
    existingRating.rating = rating;
    existingRating.date = date;
  }
  await updateDoc(userRef, localCopy);
}

const getRatingsByRelease = async (release) => {
  // Get the artistRef from the album ID
  const artistRef = doc(db, 'artists', release.artist);
  // Get album index from the "release" array
  const docSnap = await getDoc(artistRef);
  const data = docSnap.data();
  let index = 0;
  let targetIndex = undefined;
  for (const item of data.releases) {
    if (release.albumID !== item.albumID) {
      index++;
    } else {
      targetIndex = index;
    }
  }
  const ratings = data.releases[targetIndex].ratings;
  const userRatingsData = []
  ratings.map((el) => userRatingsData.push([el.username, el.rating]))
  // Trier les notes par date
  console.log(userRatingsData);
  return userRatingsData;
}

const getPersonalRatings = async (userID) => {
  const userRef = doc(db, 'users', userID);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();
  const ratings = data.ratings;
  return ratings;
}

const sendReview = async (releaseID, username, userID, review) => {
  const artistRef = doc(db, 'artists', releaseID.artist);
  const docSnap = await getDoc(artistRef);
  const data = docSnap.data();
  let index = 0;
  let targetIndex = undefined;
  for (const item of data.releases) {
    if (releaseID.albumID !== item.albumID) {
      index++;
    } else {
      targetIndex = index;
    }
  }
  const localCopy = data;
  const localReviews = localCopy.releases[targetIndex].reviews;
  const reviewDate = format(new Date(), 'dd MMM yy');
  // if user has already rated the release, replace the rating
  const userReviewObject = localReviews.find((obj) => obj.userID === userID);
  if (!userReviewObject) {
    localReviews.push({
      username: username,
      userID: userID,
      review: review,
      date: reviewDate,
      reviewsScore: 0,
    })
  } else {
    userReviewObject.review = review;
    userReviewObject.date = reviewDate;
  }
  await updateDoc(artistRef, localCopy);
  linkReviewToUser(userID, releaseID, review, reviewDate);
}

const linkReviewToUser = async (userID, release, review, date) => {
  const userRef = doc(db, 'users', userID);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();
  const localCopy = data;
  const localReviews = data.reviews;
  const existingReview = localReviews.find((obj) => obj.release.albumID === release.albumID);
  if (!existingReview) {
    localReviews.push({
      release: release,
      reviewDate: date,
      review: review,
    })
  } else {
    existingReview.review = review;
    existingReview.date = date;
  }
  await updateDoc(userRef, localCopy);
}

const getPersonalReviews = async (userID) => {
  const userRef = doc(db, 'users', userID);
  const docSnap = await getDoc(userRef);
  const data = docSnap.data();
  const reviews = data.reviews;
  return reviews;
}

const searchArtistByName = async (prompt) => {
  // Set up prompt and artist list for search
  const list = await getArtistsList();
  const cleanPrompt = prompt.trim().replace(/\s+/g, '').toLowerCase();
  const cleanList = list.map(el => {
    return el.trim().replace(/\s+/g, '').toLowerCase();
  })
  // When a match is found, retrieve the artist from the list by index
  let index = 0;
  const targetIndexes = [];
  cleanList.map(el => {
    if (el === cleanPrompt) {
      targetIndexes.push(index);
    } else {
      index++
    }
  })
  const searchResult = [];
  for (const index of targetIndexes) {
    const targetArtist = await getArtist(list[index]);
    searchResult.push(targetArtist);
  }
  return searchResult;
}

export { 
  userFirestoreSetup,
  getUserInfo,
  submitArtist, 
  submitRelease, 
  getArtistsList, 
  getAllArtistsData, 
  getArtist, 
  getReleases, 
  getAllReleases, 
  getAllReleasesLength, 
  getUniqueRelease, 
  getReleaseByID,
  updateReleaseRating, 
  getRatingsByRelease,
  getPersonalRatings,
  sendReview,
  getPersonalReviews,
  searchArtistByName,
};