const { initializeApp } = require("firebase/app");
const {
  ref,
  uploadBytes,
  getDownloadURL,
  getStorage,
} = require("firebase/storage");

//models
const { Artist } = require("../models/artist.model");
const { Album } = require("../models/album.model");

const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  appId: process.env.APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Storage service
const storage = getStorage(firebaseApp);

const uploadArtistImg = async (artist) => {
  const { name, genre } = artist.body;

  // Create firebase reference
  const [originalName, ext] = artist.file.originalname.split("."); // -> [pug, jpg]

  const filename = `${
    process.env.NODE_ENV
  }/artist/${name}/${originalName}-${Date.now()}.${ext}`;
  const imgRef = ref(storage, filename);

  // Upload image to Firebase
  await uploadBytes(imgRef, artist.file.buffer);

  const imgUrl = await getDownloadURL(imgRef);

  return await Artist.create({
    name,
    genre,
    imgUrl,
  });
};

const uploadAlbumImg = async (req) => {
  const { artist } = req;
  const { title, genre } = req.body;
  // Create firebase reference
  const [originalName, ext] = req.file.originalname.split("."); // -> [pug, jpg]

  const filename = `${
    process.env.NODE_ENV
  }/albums/${title}/${originalName}-${Date.now()}.${ext}`;
  const imgRef = ref(storage, filename);

  // Upload image to Firebase
  await uploadBytes(imgRef, req.file.buffer);

  const imgUrl = await getDownloadURL(imgRef);

  return await Album.create({
    title,
    genre,
    imgUrl,
    artistId: artist.id,
  });
};

module.exports = { uploadArtistImg, uploadAlbumImg };
