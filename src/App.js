import { useState } from "react";
import { emotionMap } from "./utils/emotionMap";
import TestingTable from "./components/testingTable";
import { testData } from "./utils/testData";

function App() {
  const [userInput, setUserInput] = useState("");
  const [processedInput, setProcessedInput] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTestingTableVisible, setIsTestingTableVisible] = useState(false);

  const handleSubmit = () => {
    setInputValue(userInput);
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
      });
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleTestButtonClick = () => {
    setIsTestingTableVisible(true);
  };

  return (
    <div>
      <h1>Gimmemoji</h1>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Process</button>

      {processedInput.length > 0 && inputValue.length > 0 ? (
        <div>
          <h2>Models:</h2>
          <h3>SamLowe/roberta-base-go_emotions</h3>
          {inputValue} {emotionMap[processedInput[0].label]}
          <h3>michellejieli / emotion_text_classifier</h3>
          {inputValue} {emotionMap[processedInput[1].label]}
          <h3>bhadresh-savani / bert-base-uncased-emotion </h3>
          {inputValue} {emotionMap[processedInput[2].label]}
        </div>
      ) : null}

      {isTestingTableVisible && (
        <div>
          <h4>Tests:</h4>
          <TestingTable inputs={testData} />
        </div>
      )}

      <button onClick={handleTestButtonClick}>Test the models</button>
    </div>
  );
}

export default App;
