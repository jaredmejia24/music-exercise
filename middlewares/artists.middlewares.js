//models
const { Artist } = require("../models/artist.model");

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError.util");

const artistExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const artist = await Artist.findOne({ where: { id, status: "active" } });

  if (!artist) {
    return next(new AppError("artist not found", 404));
  }

  req.artist = artist;
  next();
});

module.exports = { artistExist };
