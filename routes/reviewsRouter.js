import express from "express";
import ReviewsController from "../controllers/reviewsController.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ status: "success", path: req.path });
});

router.route("/movie/:id").get(ReviewsController.getAllReviews);

router.route("/new").post(ReviewsController.postReview);

router
  .route("/:id")
  .get(ReviewsController.getReview)
  .put(ReviewsController.updateReview)
  .delete(ReviewsController.deleteReview);

export default router;
