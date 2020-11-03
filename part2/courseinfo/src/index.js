import React from "react";
import ReactDOM from "react-dom";

const Header = (props) => {
  return (
    <div>
      <h2>{props.course}</h2>
    </div>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((note) => (
        <Part key={note.id} name={note.name} exercise={note.exercises} />
      ))}
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
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((note) => (
        <Course key={note.id} course={note} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
