import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = bad + good + neutral;
  const average = all === 0 ? 0 : (good - bad) / all;
  const positive = all === 0 ? 0 : good / all;
  if (all === 0) {
    return <div>No feedback given</div>;
  }
  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>good </td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>neutral </td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>bad </td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>all </td>
            <td>{all}</td>
          </tr>
          <tr>
            <td>average </td>
            <td>{average}</td>
          </tr>
          <tr>
            <td>positive </td>
            <td>{`${positive * 100}%`}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
  };

  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <h1> statistic</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
