const express = require("express");

//middlewares
const { albumExist, songExist } = require("../middlewares/songs.middlewares");
//auth middlewares
const { protectSession } = require("../middlewares/auth.middlewares");
const {
  getSongsInAnAlbum,
  createSong,
  updateSong,
  deleteSong,
  toogleFavoriteSong,
} = require("../controllers/songs.controller");
//validators
const {
  createSongValidators,
} = require("../middlewares/validators.middlewares");

const songsRouter = express.Router();

songsRouter.get("/:albumId", albumExist, getSongsInAnAlbum);

songsRouter.use(protectSession);

songsRouter.post("/:albumId", createSongValidators, albumExist, createSong);

songsRouter.patch("/id", createSongValidators, songExist, updateSong);

songsRouter.delete("/:id", songExist, deleteSong);

songsRouter.post("/favorite/:id", songExist, toogleFavoriteSong);

module.exports = { songsRouter };
