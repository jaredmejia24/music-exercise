//models
const { Album } = require("../models/album.model");
const { Artist } = require("../models/artist.model");
const { Song } = require("../models/song.model");
const { FavoriteSong } = require("../models/favoriteSong.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");

const createSong = catchAsync(async (req, res, next) => {
  const { title } = req.body;
  const { album } = req;

  const newSong = await Song.create({ title, albumId: album.id });

  res.status(201).json({
    status: "success",
    data: {
      newSong,
    },
  });
});

const getSongsInAnAlbum = catchAsync(async (req, res, next) => {
  const { album } = req;

  const songs = await Song.findAll({
    where: { albumId: album.id, status: "active" },
    include: { model: Album, include: { model: Artist } },
  });

  res.status(200).json({
    status: "success",
    data: {
      songs,
    },
  });
});

const updateSong = catchAsync(async (req, res, next) => {
  const { song } = req;
  const { title } = req.body;

  await song.update({ title });

  res.status(200).json({
    status: "success",
    data: {
      song,
    },
  });
});

const deleteSong = catchAsync(async (req, res, next) => {
  const { song } = req;

  await song.update({ status: "disabled" });

  res.status(204).json({
    status: "success",
  });
});

const toogleFavoriteSong = catchAsync(async (req, res, next) => {
  const { song, sessionUser } = req;

  const favoriteSong = await FavoriteSong.findOne({
    where: { userId: sessionUser.id, songId: song.id },
    attributes: ["id", "favorite"],
  });
  console.log(favoriteSong);

  //favorite song already exist in the model
  if (favoriteSong) {
    await favoriteSong.update({ favorite: !favoriteSong.favorite });
    return res.status(200).json({
      status: "success",
      data: {
        favoriteSong,
      },
    });
  }

  //first time user marking the song favorite
  const newFavoriteSong = await FavoriteSong.create({
    userId: sessionUser.id,
    songId: song.id,
  });

  res.status(201).json({
    status: "success",
    data: {
      favoriteSong: newFavoriteSong,
    },
  });
});

module.exports = {
  createSong,
  getSongsInAnAlbum,
  updateSong,
  deleteSong,
  toogleFavoriteSong,
};
