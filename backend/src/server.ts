import express, { Request, Response } from "express";
import mongoose from "mongoose";

import Deck from "./models/Deck";

const PORT = 3000;
const noDataErrorMessage = "No data in request";

const app = express();

// Body parser middleware
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Root route!");
});

app.post("/decks", async (req: Request, res: Response) => {
  if (req.body === undefined || req.body.title === undefined) {
    console.log(noDataErrorMessage);
    return res.status(400).json({ error: noDataErrorMessage });
  }
  const newDeck = new Deck({
    name: req.body.title,
  });

  const createdDeck = await newDeck.save();
  console.log(createdDeck ? `Deck created with id ${createdDeck.id}` : "Error creating deck");
  createdDeck
    ? res.status(201).json(createdDeck)
    : res.status(400).json({ error: "Error creating deck" });
});

// Connect to MongoDB
// TODO: Don't use magic strings, use environment variables later
// Do then to chain server start after db connection

mongoose.set("strictQuery", false);

mongoose
  .connect("mongodb+srv://FoAMDFun:tiCysHfIik7WDstg@cluster0.yg6lcbo.mongodb.net/flashcards")
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
    process.exit(1);
  });
