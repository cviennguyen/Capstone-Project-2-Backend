const Service = require("../models/serviceModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllServices = catchAsync(async (req, res, next) => {
  const services = await Service.find();

  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: services.length,
    data: {
      services,
    },
  });
});

exports.getService = catchAsync(async (req, res, next) => {
  const service = await Service.findById(req.params.id)
    .populate("reviews")
    .populate({
      path: "favorites",
      select: "-__v",
    });

  if (!service) {
    res.status(404).json({
      status: "fail",
      message: "No service found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      service,
    },
  });
});

exports.createService = catchAsync(async (req, res, next) => {
  const newService = await Service.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      service: newService,
    },
  });
});

exports.updateService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndUpdate(req.params.id, req.body);
  if (!service) {
    res.status(404).json({
      status: "fail",
      message: "No service found with that ID",
    });
  }

  res.status(200).json({
    status: "success",
  });
});

exports.deleteService = catchAsync(async (req, res, next) => {
  const service = await Service.findByIdAndDelete(req.params.id);
  if (!service) {
    res.status(404).json({
      status: "fail",
      message: "No service found with that ID",
    });
  }

  res.status(204).json({
    status: "success",
    data: null,
  });
});
