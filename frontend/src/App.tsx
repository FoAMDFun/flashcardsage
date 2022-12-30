import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:3000";

type TDeck = {
  title: string;
  _id: string;
};

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  useEffect(() => {
    handleGetDecks();
  }, []);

  async function handleGetDecks() {
    fetch(`${API_URL}/decks`)
      .then((response) => response.json())
      .then((newDecks) => {
        setDecks(newDecks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function handleCreateDeck() {
    const response = await fetch(`${API_URL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    if (response.ok) {
      const newDeck = await response.json();
      setDecks([...decks, newDeck]);
      setTitle("");
    }
  }

  async function handleDeleteDeck(id: string) {
    const response = await fetch(`${API_URL}/decks/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newDecks = decks.filter((deck) => deck._id !== id);
      setDecks(newDecks);
    } else {
      // reload from backend
      handleGetDecks();
    }
  }
  return (
    <div className="App">
      <div>
        {decks.length > 0 && (
          <ul className="decks">
            {decks.map((deck) => (
              <li key={deck._id}>
                <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                {deck.title}
              </li>
            ))}
          </ul>
        )}
        {decks.length === 0 && <p>No decks yet</p>}
      </div>
      <form
        onSubmit={(source) => {
          source.preventDefault();
          handleCreateDeck();
        }}
      >
        <label htmlFor="deck-title">Deck Title</label>
        <input
          onChange={(source: React.ChangeEvent<HTMLInputElement>) => {
            // TODO: save what they typed in the input
            setTitle(source.target.value);
          }}
          type="text"
          id="deck-title"
          value={title}
        />
        <button type="submit" disabled={title === ""}>
          Create Deck
        </button>
      </form>
    </div>
  );
}

export default App;
