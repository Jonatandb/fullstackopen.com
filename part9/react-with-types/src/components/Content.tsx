import React from 'react'

interface Props {
  name: string,
  exerciseCount: number
}

export const Content = ({name, exerciseCount}: Props): JSX.Element => {
  return (
    <p>
      {name} {exerciseCount}
    </p>
  )
}
