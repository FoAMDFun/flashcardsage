import { API_URL } from "./constants";

export async function deleteDeck(id: string): Promise<void> {
  const response = await fetch(`${API_URL}/decks/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return Promise.resolve();
  } else {
    return Promise.reject(response.status);
  }
}
