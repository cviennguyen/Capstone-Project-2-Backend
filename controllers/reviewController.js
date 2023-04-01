const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllReview = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

//delete Review
exports.deleteReview = catchAsync(async (req, res, next) => {
  await Review.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  if (!req.body.service) req.body.service = req.params.serviceId;
  if (!req.body.user) req.body.user = req.user._id;

  const existingReview = await Review.findOne({
    service: req.body.service,
    user: req.body.user,
  });

  if (existingReview) {
    res.status(400).json({
      status: "fail",
      message: "You already reviewed this service, try to update it instead",
    });
    next();
  }

  const newReview = await Review.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});
