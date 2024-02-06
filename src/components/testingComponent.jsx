/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { emotionMap } from "../utils/emotionMap";

function TestingComponent({ input }) {
  const [processedInput, setProcessedInput] = useState([]);

  useEffect(() => {
    const generateEmojis = () => {
      fetch("http://localhost:5000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input_data: input.sentence }),
      })
        .then((response) => response.json())
        .then((data) => {
          setProcessedInput(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    };

    generateEmojis();
  }, []);

  return (
    <div>
      {processedInput.length > 0 && (
        <>
          {"m1:" + emotionMap[processedInput[0].label]} -{" "}
          {"m2:" + emotionMap[processedInput[1].label]} -{" "}
          {"m3:" + emotionMap[processedInput[2].label]}
        </>
      )}
    </div>
  );
}

export default TestingComponent;
