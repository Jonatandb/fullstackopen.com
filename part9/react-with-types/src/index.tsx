import React from "react";
import ReactDOM from "react-dom";
import { Content } from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      {
        courseParts.map(c => <Content key={c.name} name={c.name} exerciseCount={c.exerciseCount} />)
      }
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));