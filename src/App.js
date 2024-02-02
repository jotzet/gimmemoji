import React, { useState } from "react";
import "./App.css";
import gimmemojiImg from "./utils/gimmemoji.png";
import getEmojis from "./utils/getEmojis.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emojis = getEmojis();
    setOutputText(inputText + emojis);
  };

  return (
    <div className="container">
      <h1>Gimmemoji</h1>
      <img src={gimmemojiImg} alt=">:(" />
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <button className="submit-button" type="submit">
          Add Emojis
        </button>
      </form>
      <p>{outputText}</p>
    </div>
  );
}

export default App;
