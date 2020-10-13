import React from 'react'

const Total = ({ course: { parts } }) => <h4>Number of exercises {parts.reduce((total, part) => {
    // console.log('2.3*: Course information step8 - https://fullstackopen.com/en/part2/rendering_a_collection_modules');
    return total += part.exercises
}, 0)}</h4>

export default Total
