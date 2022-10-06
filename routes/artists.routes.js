const express = require("express");

const { upload } = require("../utils/multer.util");

//controllers
const {
  getAllArtists,
  createArtist,
  updateArtist,
  deleteArtist,
  createAlbum,
} = require("../controllers/artists.controller");

//middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const { artistExist } = require("../middlewares/artists.middlewares");
//validators
const {
  createArtistValidators,
  createAlbumValidators,
} = require("../middlewares/validators.middlewares");

const artistsRouter = express.Router();

artistsRouter.get("/", getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post(
  "/",
  upload.single("artistImg"),
  createArtistValidators,
  createArtist
);

artistsRouter.patch("/:id", artistExist, updateArtist);

artistsRouter.delete("/:id", artistExist, deleteArtist);

artistsRouter.post(
  "/albums/:id",
  upload.single("albumImg"),
  createAlbumValidators,
  artistExist,
  createAlbum
);

module.exports = { artistsRouter };
