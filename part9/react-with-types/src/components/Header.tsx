import React from 'react'

interface HeaderProps {
  courseName?: string
}

export default function Header({courseName}: HeaderProps): JSX.Element {
  return <h1>{courseName}</h1>
}
