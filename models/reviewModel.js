import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
    required: [true, "You must define a user !"],
  },

  review: {
    type: String,
    required: [true, "You must define a review !"],
  },

  movieId: {
    type: Number,
    required: [true, "You must define an ID !"],
  },
});

const Review = mongoose.model("Reviews", reviewSchema);

export default Review;
