import DeckSchema, { Deck } from "../models/Deck";

export default class DeckService {
  public getDecks = () => DeckSchema.find({});
  public createDeck = (newDeck: Deck) => DeckSchema.create(newDeck);
  public deleteDeck = (id: string) => DeckSchema.findByIdAndDelete(id);
}
