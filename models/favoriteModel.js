const mongoose = require("mongoose");

const favoriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Favorite must belong to a user"],
  },
  service: {
    type: mongoose.Schema.ObjectId,
    ref: "Service",
    required: [true, "Favorite must belong to a service"],
  },
});

favoriteSchema.pre(/^find/, function (next) {
  this.populate({
    path: "service",
    select: "name",
  });
  next();
});

module.exports = mongoose.model("Favorite", favoriteSchema);
