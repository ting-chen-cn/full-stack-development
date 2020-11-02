import React, { useState } from "react";
import ReactDOM from "react-dom";

const Button = (props) => (
  <button onClick={props.handleClick}>{props.text}</button>
);
const Display = (props) => {
  return (
    <div>
      {props.text}
      {props.value}
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
    console.log("good:", good);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    console.log("neutral:", neutral);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    console.log("bad:", bad);
  };

  return (
    <div>
      <h1> give feedback</h1>
      <Button handleClick={() => handleGoodClick()} text="good" />
      <Button handleClick={() => handleNeutralClick()} text="neutral" />
      <Button handleClick={() => handleBadClick()} text="bad" />
      <h1> statistic</h1>
      <Display text="good " value={good} />
      <Display text="neutral " value={neutral} />
      <Display text="bad " value={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
