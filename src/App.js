import React, { useState } from "react";
import "./App.css";
import getEmojis from "./utils/getEmojis.js";

function App() {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); // Show loading indicator

    try {
      const result = await getEmojis(inputText);
      setOutputText(inputText + result);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  return (
    <div className="container">
      <h1>Gimmemoji</h1>
      <form onSubmit={handleSubmit}>
        <input
          className="input-field"
          type="text"
          value={inputText}
          onChange={handleChange}
          placeholder="Enter text"
        />
        <button className="submit-button" type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Add Emojis"}
        </button>
      </form>
      {outputText}
    </div>
  );
}

export default App;
