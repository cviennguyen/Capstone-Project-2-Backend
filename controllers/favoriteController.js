const Favorite = require("../models/favoriteModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllFavorite = catchAsync(async (req, res, next) => {
  const favorites = await Favorite.find({
    user: req.user._id,
  }).populate("service");
  console.log(req.user._id);
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: favorites.length,
    data: {
      favorites,
    },
  });
  next();
});

exports.addFavorite = catchAsync(async (req, res, next) => {
  if (!req.body.service) req.body.service = req.params.serviceId;
  if (!req.body.user) req.body.user = req.user._id;

  const newFavorite = await Favorite.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      favorite: newFavorite,
    },
  });
});

exports.deleteFavorite = catchAsync(async (req, res, next) => {
  const favorite = await Favorite.findOneAndDelete({
    service: req.params.serviceId,
  });
  if (!favorite) {
    res.status(404).json({
      status: "fail",
      message: "No favorite found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
  });
});
