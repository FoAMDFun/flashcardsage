import { TDeck } from "./DeckInterface";
import { API_URL } from "./constants";

export async function createDeck(newDeck: string): Promise<TDeck | void> {
  const response = await fetch(`${API_URL}/decks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: newDeck }),
  });
  if (response.ok) {
    const newDeck = await response.json();
    return Promise.resolve(newDeck);
  } else {
    return Promise.reject(response.status);
  }
}
