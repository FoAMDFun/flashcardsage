import { config as dotenvConfig } from "dotenv";
dotenvConfig();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import logger from "./config/logger";
import { deckRoutes } from "./routes/deck.routes";
import { errorHandler } from "./middlewares/error.middleware";

const PORT = 3000;

const app = express();

// middlewares
// Body parser
app.use(express.json());
// cors
app.use(cors());

// Routes
app.use("/decks", deckRoutes);

// Error handling
app.use(errorHandler);

mongoose.set("strictQuery", false);

const mongoURL = process.env.MONGO_URL || "";
if (mongoURL.length === 0) {
  logger.error("No MongoDB URL provided, exiting...");
  process.exit(1);
}

const displayMongoURL = mongoURL.replace(/:[^@]+@/, "//user:*****@");

mongoose
  .connect(mongoURL)
  .then(() => {
    logger.info(`Connected to MongoDB at URL: ${displayMongoURL}`);

    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    logger.error(err);
    process.exit(1);
  });
