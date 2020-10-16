import React from 'react'
import Part from './Part'

const Content = ({ course: { parts } }) => <>{parts.map(p => <Part key={p.name} {...p} />)}</>

export default Content
