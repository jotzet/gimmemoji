import TestingComponent from "./testingComponent";
import { testData } from "../utils/testData"; // Import testData

function TestingTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Sentence</th>
          <th>Result</th>
        </tr>
      </thead>
      <tbody>
        {testData.map((data) => (
          <tr key={data.sentence}>
            <td>{data.sentence}</td>
            <td>expected - {data.emoji}</td>
            <td>
              <TestingComponent input={data} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default TestingTable;
