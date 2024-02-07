import { useState, useEffect } from "react";
import { testData } from "../utils/testData";

const Evaluator = () => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const evaluateModel = async () => {
      try {
        const response = await fetch("http://localhost:5000/evaluate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(testData),
        });
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error evaluating model:", error);
      }
    };

    evaluateModel();
  }, []);

  return (
    <div>
      <div>
        <p>
          Model 1 Score: {scores[0]}/{scores[3]}
        </p>
        <p>
          Model 2 Score: {scores[1]}/{scores[3]}
        </p>
        <p>
          Model 3 Score: {scores[2]}/{scores[3]}
        </p>
      </div>
    </div>
  );
};

export default Evaluator;
