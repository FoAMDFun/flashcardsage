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
    fetch(`${API_URL}/decks`)
      .then((response) => response.json())
      .then((newDecks) => {
        setDecks(newDecks);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);
  return (
    <div className="App">
      <div className="decks">
        <ul className="decks">
          {decks.map((deck) => (
            <li key={deck._id}>{deck.title}</li>
          ))}
        </ul>
      </div>
      <form
        onSubmit={(source) => {
          source.preventDefault();

          // send back to the backend
          fetch(`${API_URL}/decks`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ title }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log("Successfully created data: ", result);
              setTitle("");
            })
            .catch((error) => {
              console.error("Error:", error);
            });
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
