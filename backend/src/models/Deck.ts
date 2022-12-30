import mongoose from "mongoose";

export interface Deck {
  title: string;
}

const Schema = mongoose.Schema;

const DeckSchema = new Schema<Deck>({
  title: String,
});

export default mongoose.model("Deck", DeckSchema);
