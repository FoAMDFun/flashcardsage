import React, { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState<string>("");

  return (
    <div className="App">
      <form
        onSubmit={(source) => {
          source.preventDefault();

          // send back to the backend
          fetch("http://localhost:3000/decks", {
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
