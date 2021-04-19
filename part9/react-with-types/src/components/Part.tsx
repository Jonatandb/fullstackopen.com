import React from 'react'
import { CoursePart } from '../index'

/**
 * Helper function for exhaustive type checking
 */
 const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export interface PartProps {
  part: CoursePart
}

const Part = ({ part }: PartProps): JSX.Element => {
  switch (part.name) {
    case "Fundamentals":
      return (
          <p>
            <strong>{part.name} {part.exerciseCount}</strong><br/>
            <i>{part.description}</i>
          </p>
      )
    case "Using props to pass data":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br/>
          Project exercices {part.groupProjectCount}
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br/>
          <i>{part.description}</i><br/>
          Submit to {part.exerciseSubmissionLink}
        </p>
      )
    case "Typescript essentilas v2":
      return (
        <p>
          <strong>{part.name} {part.exerciseCount}</strong><br/>
          <i>{part.description}</i>
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part
