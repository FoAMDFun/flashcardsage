import mongoose from "mongoose";

export interface Deck {
  name: string;
}

const Schema = mongoose.Schema;

const DeckSchema = new Schema<Deck>({
  name: String,
});

export default mongoose.model("Deck", DeckSchema);
