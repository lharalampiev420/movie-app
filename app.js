import express from "express";
import cors from "cors";
import helmet from "helmet";
import reviewsRouter from "./routes/reviewsRouter.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use("/api/v1/reviews", reviewsRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "This route has not been implemented !" })
);

export default app;
