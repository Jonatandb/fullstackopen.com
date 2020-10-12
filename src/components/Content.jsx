import React from 'react'
import Part from './Part'
const Content = ({ partsData }) => <>
    {partsData.map(p => <Part key={p.name} {...p} />)}
</>
export default Content
