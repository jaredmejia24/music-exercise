//models
const { Artist } = require("../models/artist.model");
const { Album } = require("../models/album.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { uploadArtistImg, uploadAlbumImg } = require("../utils/firebase.util");

const getAllArtists = catchAsync(async (req, res, next) => {
  const artists = await Artist.findAll({
    where: { status: "active" },
    include: { model: Album },
  });

  res.status(200).json({
    status: "success",
    data: {
      artists,
    },
  });
});

const createArtist = catchAsync(async (req, res, next) => {
  const newArtist = await uploadArtistImg(req);

  res.status(201).json({
    status: "success",
    data: {
      newArtist,
    },
  });
});

const updateArtist = catchAsync(async (req, res, next) => {
  const { artist } = req;
  const { name } = req.body;

  const artistUpdated = await artist.update({ name });

  res.status(200).json({
    status: "success",
    data: {
      artistUpdated,
    },
  });
});

const deleteArtist = catchAsync(async (req, res, next) => {
  const { artist } = req;

  await artist.update({ status: "disabled" });

  res.status(204).json({ status: "success" });
});

const createAlbum = catchAsync(async (req, res, next) => {
  const newAlbum = await uploadAlbumImg(req);

  res.status(201).json({
    status: "success",
    data: {
      newAlbum,
    },
  });
});

module.exports = {
  getAllArtists,
  createAlbum,
  createArtist,
  updateArtist,
  deleteArtist,
};
