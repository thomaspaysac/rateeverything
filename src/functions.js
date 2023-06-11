import { doc, collection, getCountFromServer, getFirestore, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
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

const submitRelease = async (artist, release, year, tracks, ratings, reviews, id) => {
  const artistRef = doc(db, 'artists', artist);
  await updateDoc(artistRef, {
    releases: arrayUnion({
      artist: artist, 
      release: release,
      year: year,
      tracks: tracks,
      ratings: ratings,
      reviews: reviews,
      get average(){
        return (this.ratings.reduce((acc, curr) => acc + curr, 0) / this.ratings.length).toFixed(2);
      },
    })
  })
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
  const data = await getArtist('Metallica');
  return data.releases;
}

const getUniqueRelease = async (artist) => {
  const data = await getArtist('Metallica');
  return data.releases[0];
}

export { submitArtist, submitRelease, getArtist, getReleases, getUniqueRelease };