import React from 'react'

const Total = ({ course: { parts } }) => <p>Number of exercises {parts.reduce((total, part) => total += part.exercises, 0)}</p>

export default Total
