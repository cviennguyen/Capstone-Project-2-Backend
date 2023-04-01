const mongoose = require("mongoose");
const slugify = require("slugify");

const servicesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A service must have a name"],
      unique: true,
      trim: true,
    },
    slug: String,
    category: {
      type: String,
      required: [true, "A service must have a category"],
      enum: {
        values: ["restaurant", "hotel", "attraction"],
      },
    },
    location: {
      type: String,
    },
    phone: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
<<<<<<< HEAD
      default: 0,
=======
      default: 1,
>>>>>>> 30c05cc2b48c3eefca678cceaa2abe7196dd4bb1
    },
    description: {
      type: String,
    },
    imageCover: {
      type: String,
    },
    providers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

servicesSchema.virtual("reviews", {
  ref: "Review",
  foreignField: "service",
  localField: "_id",
});

servicesSchema.virtual("favorites", {
  ref: "Favorite",
  foreignField: "service",
  localField: "_id",
});
// DOCUMENT MIDDLEWARE: runs before .save() and .create()
servicesSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

servicesSchema.pre(/^find/, function (next) {
  this.populate({
    path: "providers",
    select: "-__v",
  });
  next();
});

const Service = mongoose.model("Service", servicesSchema);

module.exports = Service;
