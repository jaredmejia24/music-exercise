const { body, validationResult } = require("express-validator");

// Utils
const { AppError } = require("../utils/appError.util");

const checkValidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // [{ ..., msg }] -> [msg, msg, ...] -> 'msg. msg. msg. msg'
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join(". ");

    return next(new AppError(message, 400));
  }

  next();
};

const createUserValidators = [
  body("name")
    .isString()
    .withMessage("Name must be a string")
    .notEmpty()
    .withMessage("Name cannot be empty")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters"),
  body("email").isEmail().withMessage("Must provide a valid email"),
  body("password")
    .isString()
    .withMessage("Password must be a string")
    .notEmpty()
    .withMessage("Password cannot be empty")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  checkValidations,
];

const createArtistValidators = [
  body("name")
    .isString()
    .withMessage("name must be a string")
    .notEmpty()
    .withMessage("name cannot be empty"),
  body("genre")
    .isString()
    .withMessage("genre must be a string")
    .notEmpty()
    .withMessage("genre cannot be empty"),
  checkValidations,
];

const createAlbumValidators = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty"),
  body("genre")
    .isString()
    .withMessage("genre must be a string")
    .notEmpty()
    .withMessage("genre cannot be empty"),
  checkValidations,
];

const createSongValidators = [
  body("title")
    .isString()
    .withMessage("title must be a string")
    .notEmpty()
    .withMessage("title cannot be empty"),
  checkValidations,
];

module.exports = {
  createUserValidators,
  createArtistValidators,
  createAlbumValidators,
  createSongValidators,
};
