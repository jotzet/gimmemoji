import { useState } from "react";

function App() {
  const emojiMap = {
    disappointment: "😞",
    sadness: "😢",
    annoyance: "😠",
    neutral: "😐",
    disapproval: "👎",
    realization: "💡",
    nervousness: "😰",
    approval: "👍",
    joy: "😄",
    anger: "😡",
    embarrassment: "😳",
    caring: "❤️",
    remorse: "😔",
    disgust: "🤢",
    grief: "💔",
    confusion: "😕",
    relief: "😌",
    desire: "😍",
    admiration: "😊",
    optimism: "😊",
    fear: "😨",
    love: "❤️",
    excitement: "😃",
    curiosity: "🤔",
    amusement: "😆",
    surprise: "😲",
    gratitude: "🙏",
    pride: "🏆",
  };

  const [userInput, setUserInput] = useState("");
  const [processedInput, setProcessedInput] = useState("");

  const handleSubmit = () => {
    fetch("http://localhost:5000/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input_data: userInput }),
    })
      .then((response) => response.json())
      .then((data) => {
        const highScoreEmotions = data.result.filter(
          (emotion) => emotion.score > 0.5
        );

        let emojiString = "";

        for (let element of highScoreEmotions) {
          emojiString = emojiString + emojiMap[element.label];
        }
        setProcessedInput(userInput + emojiString);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <input type="text" value={userInput} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Process</button>
      <div>{processedInput}</div>
    </div>
  );
}

export default App;
