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
          {part.name} {part.description} {part.exerciseCount}
        </p>
      )
    case "Using props to pass data":
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount} {part.groupProjectCount}
        </p>
      )
    case "Deeper type usage":
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount} {part.exerciseSubmissionLink}
        </p>
      )
    case "Typescript essentilas v2":
      return (
        <p>
          {part.name} {part.description} {part.exerciseCount}
        </p>
      )
    default:
      return assertNever(part);
  }
}

export default Part
