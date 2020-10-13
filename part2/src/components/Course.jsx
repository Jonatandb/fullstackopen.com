import React from 'react'
import Content from './Content'
import Header from './Header'

export default function Course({ course }) {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
        </>
    )
}
