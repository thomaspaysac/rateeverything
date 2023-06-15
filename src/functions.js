import { doc, collection, getCountFromServer, getFirestore, getDoc, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "./firebase";


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
      get average(){
        return (this.ratings.reduce((acc, curr) => acc + curr, 0) / this.ratings.length).toFixed(2);
      },
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

const updateReleaseRating = async (release, user, rating) => {
  // Get the artistRef from the album ID
  const artistRef = doc(db, 'artists', release.artist);
  // Get album index from the "release" array
  const releasesArray = await getReleases(release.artist);
  let targetIndex = 0;
  for (const item of releasesArray) {
    if (item.albumID !== release.albumID) {
      ++targetIndex;
    }
  }
  await updateDoc(artistRef, {
    releases: arrayUnion({
      ratings: {
        user: user,
        rating: rating
      },
    })
  })
}

export { submitArtist, 
  submitRelease, 
  getArtistsList, 
  getAllArtistsData, 
  getArtist, 
  getReleases, 
  getAllReleases, 
  getAllReleasesLength, 
  getUniqueRelease, 
  getReleaseByID,
  updateReleaseRating 
};