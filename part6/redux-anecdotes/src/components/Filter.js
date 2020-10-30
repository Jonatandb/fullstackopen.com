import React from 'react'
import { useDispatch } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()

    const handleChange = evt => {
        console.log('mandar al state:', evt.target.value)
        dispatch(setFilter(evt.target.value))
    }

    return (
        <div style={{ marginBottom: 10 }}>
            Filter <input id="filter" type="text" onChange={handleChange} />
        </div>
    )
}

export default Filter