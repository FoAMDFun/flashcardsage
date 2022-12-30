import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDecks } from "./api/getDecks";
import { TDeck } from "./api/DeckInterface";
import "./App.css";
import { createDeck } from "./api/createDeck";
import { deleteDeck } from "./api/deleteDeck";

function App() {
  const [title, setTitle] = useState<string>("");
  const [decks, setDecks] = useState<TDeck[]>([]);

  useEffect(() => {
    handleGetDecks();
  }, []);

  async function handleGetDecks() {
    getDecks()
      .then((decks) => {
        if (decks) setDecks(decks);
      })
      .catch((error) => console.log(error));
  }

  async function handleCreateDeck() {
    createDeck(title)
      .then((deck) => {
        if (deck) {
          setDecks([...decks, deck]);
          setTitle("");
        }
      })
      .catch((error) => console.log(error));
  }

  async function handleDeleteDeck(id: string) {
    deleteDeck(id)
      .then(() => {
        //console.log("deck deleted");
        setDecks(decks.filter((deck) => deck._id !== id));
      })
      .catch(() => handleGetDecks());
  }

  return (
    <div className="App">
      <div>
        {decks.length > 0 && (
          <ul className="decks">
            {decks.map((deck) => (
              <li key={deck._id}>
                <button onClick={() => handleDeleteDeck(deck._id)}>X</button>
                <Link to={`/decks/${deck._id}`}>{deck.title}</Link>
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
