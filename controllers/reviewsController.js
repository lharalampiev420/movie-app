//import mongoose from "mongoose";
import Review from "../models/reviewModel.js";

class ReviewsController {
  getAllReviews = async (req, res) => {
    res.status(200).json({ status: "Not yet implemented !" });
  };

  getReview = async (req, res) => {
    console.log("TODO");
    res.status(200).json({ status: "Not yet implemented !" });
  };

  postReview = async (req, res) => {
    try {
      const user = req.body.user;
      const review = req.body.review;
      const reviewId = req.body.reviewId;

      const data = await Review.create({ user, review, reviewId });

      res.status(200).json({ status: "success", data });
    } catch (err) {
      res.status(400).json({ status: "fail", message: err });
    }
    console.log("TODO");
  };

  updateReview = async (req, res) => {
    res.status(200).json({ status: "Not yet implemented !" });
  };

  deleteReview = async (req, res) => {
    res.status(200).json({ status: "Not yet implemented !" });
  };
}

export default new ReviewsController();
