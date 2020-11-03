import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part name={props.parts[0].name} exercise={props.parts[0].exercises} />
      <Part name={props.parts[1].name} exercise={props.parts[1].exercises} />
      <Part name={props.parts[2].name} exercise={props.parts[2].exercises} />
    </div>
  );
};

const Part = (props) => {
  return (
    <div>
      <>
        {props.name} {props.exercise}
      </>
    </div>
  );
};
const Total = (props) => {
  const initialValue = 0;
  const total = props.parts.reduce(
    (accumulator, currentValue) => accumulator + currentValue.exercises,
    initialValue
  );

  return (
    <div>
      <b>
        total of &nbsp;{""}
        {total}
        &nbsp; exercises
      </b>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

ReactDOM.render(<App />, document.getElementById("root"));
