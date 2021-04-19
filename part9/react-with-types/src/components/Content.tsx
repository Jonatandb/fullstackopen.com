import React from 'react'
import Part from './Part'
import { CoursePart } from '../index'

export interface ContentProps {
  courseParts: CoursePart[]
}

export const Content = ({ courseParts }: ContentProps): JSX.Element => {
  return (
    <>
      {
        courseParts.map(part => <Part key={part.name} part={part} />)
      }
    </>
  )
}
