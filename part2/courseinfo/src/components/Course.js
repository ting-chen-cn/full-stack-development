import React from "react";

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
export default Course;
