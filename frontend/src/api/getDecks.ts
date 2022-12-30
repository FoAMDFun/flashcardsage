import { TDeck } from "./DeckInterface";

const API_URL = "http://localhost:3000";

export async function getDecks(): Promise<TDeck[] | void> {
  fetch(`${API_URL}/decks`)
    .then((response) => response.json())
    .then((newDecks: TDeck[]) => {
      return Promise.resolve(newDecks);
    })
    .catch((error) => {
      return Promise.reject(error);
    });
}
