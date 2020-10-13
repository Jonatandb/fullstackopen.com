import React from 'react'

const Total = ({ course: { parts } }) => <h4>Number of exercises {parts.reduce((total, part) => total += part.exercises, 0)}</h4>

export default Total
