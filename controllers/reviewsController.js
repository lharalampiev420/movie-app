import mongoose from "mongoose";
import Review from "../models/reviewModel.js";

class ReviewsController {
  getAllReviewsForMovie = async (req, res) => {
    try {
      const id = req.params.id;
      const reviews = await Review.find({ movieId: id });

      if (reviews.length < 1) throw new Error("No reviews for this movie !");

      res
        .status(200)
        .json({ status: "success", reviewsCount: reviews.length, reviews });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    }
  };

  getReview = async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.params.id);

      const review = await Review.findById(id);

      if (!review) throw new Error("No review found with the given ID !");

      res.status(200).json({ status: "success", review });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    }
  };

  postReview = async (req, res) => {
    try {
      const user = req.body.user;
      const review = req.body.review;
      const movieId = req.body.movieId;

      const data = await Review.create({ user, review, movieId });

      res.status(200).json({ status: "success", data });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    }
  };

  updateReview = async (req, res) => {
    try {
      const user = req.body.user;
      const review = req.body.review;
      const movieId = req.body.movieId;
      const id = req.params.id;

      const changed_review = await Review.findByIdAndUpdate(
        id,
        {
          review,
          user,
          movieId,
        },
        { new: true, runValidators: false }
      );

      if (!changed_review)
        throw new Error("No review found with the given ID !");

      res.status(200).json({ status: "success", changed_review });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err.message });
    }
  };

  deleteReview = async (req, res) => {
    try {
      const id = mongoose.Types.ObjectId(req.params.id);
      const review = await Review.findByIdAndDelete(id);

      if (review["deletedCount"] === 0)
        throw new Error("No review found with the given ID !");

      res
        .status(200)
        .json({ status: "success", action: "Review has been deleted !" });
    } catch (err) {
      res.status(400).json({
        status: "fail",
        message: "No review found with the given ID !",
      });
    }
  };
}

export default new ReviewsController();
