//models
const { Album } = require("../models/album.model");
const { Song } = require("../models/song.model");

//utils
const { AppError } = require("../utils/appError.util");
const { catchAsync } = require("../utils/catchAsync.util");

const albumExist = catchAsync(async (req, res, next) => {
  const { albumId } = req.params;

  const album = await Album.findOne({
    where: { id: albumId, status: "active" },
  });

  if (!album) {
    return next(new AppError("album not found", 404));
  }

  req.album = album;
  next();
});

const songExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const song = await Song.findOne({ where: { id, status: "active" } });

  if (!song) {
    return next(new AppError("song not found", 404));
  }

  req.song = song;
  next();
});

module.exports = { albumExist, songExist };
