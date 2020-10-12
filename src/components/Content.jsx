import React from 'react'
const Content = ({ partsData }) => <>
    {partsData.map(p => <p key={p.name}>{p.name} {p.exercises}</p>)}
</>
export default Content
