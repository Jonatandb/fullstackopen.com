import React from 'react'

interface Props {
  courseParts: Array<{
    name: string,
    exerciseCount: number
  }>
}

const Total = ({courseParts}: Props): JSX.Element => {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  )
}

export default Total
