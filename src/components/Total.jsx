import React from 'react'
const Total = ({ exercisesAmounts }) => <p>Number of exercises {exercisesAmounts.reduce((total, currentExerciseAmount) => total += currentExerciseAmount, 0)}</p>
export default Total
