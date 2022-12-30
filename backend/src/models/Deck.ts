import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Deck = new Schema({
  name: String,
});

export default mongoose.model("Deck", Deck);
