import React from 'react'

const Total = ({ course: { parts } }) => <h3>total of {parts.reduce((total, part) => total += part.exercises, 0)} exercises</h3>

export default Total
