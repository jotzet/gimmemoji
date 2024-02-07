import { useState } from "react";
import "./App.css";
import Evaluator from "./components/Evaluator";

function App() {
  const [userInput, setUserInput] = useState("");
  const [processedInput, setProcessedInput] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [showEvalution, setShowEvaluation] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const handleSubmit = () => {
    setInputValue(userInput);
    setIsLoading(true); // Set loading state to true when starting the fetch operation
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_data: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProcessedInput(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleButtonClick = () => {
    setShowEvaluation(true);
  };

  return (
    <div>
      <h1>Gimmemoji</h1>
      <button onClick={handleButtonClick}>Evaluate the models</button>
      {showEvalution && <Evaluator />}
      <h2>Add emoji to your text</h2>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Process</button>
      {isLoading && <p>Loading...</p>}{" "}
      {processedInput.length > 0 && inputValue.length > 0 ? (
        <div>
          <h2>Models:</h2>
          <h3>SamLowe/roberta-base-go_emotions</h3>
          {inputValue} {processedInput[0]}
          <h3>michellejieli / emotion_text_classifier</h3>
          {inputValue} {processedInput[1]}
          <h3>bhadresh-savani / bert-base-uncased-emotion </h3>
          {inputValue} {processedInput[2]}
        </div>
      ) : null}
    </div>
  );
}

export default App;
