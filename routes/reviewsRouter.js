import express from "express";
import ReviewsController from "../controllers/reviewsController.js";

const router = express.Router();

router.route("/").get((req, res) => {
  res.status(200).json({ status: "success", route: "base", path: req.path });
});

router.route("/movie/:id?").get(ReviewsController.getAllReviewsForMovie);

router.route("/new").post(ReviewsController.postReview);

router
  .route("/:id")
  .get(ReviewsController.getReview)
  .put(ReviewsController.updateReview)
  .delete(ReviewsController.deleteReview);

export default router;
