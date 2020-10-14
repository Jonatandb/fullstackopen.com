import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Country from './countries/Country'

function App() {
    const [countries, setCountries] = useState([])
    const [searchText, setSearchText] = useState('')

    const handleChange = evt => {
        setSearchText(evt.target.value)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                const data = response.data
                setCountries(data)
            })
    }, [])

    let filteredCountries = []

    let result = ''

    if (searchText.length > 0) {
        filteredCountries = countries.filter(c => {
            return c.name.toLowerCase().includes(searchText.toLowerCase())
        })
        if (filteredCountries.length > 10) {
            result = <div>Too many matches, specify another filter</div>
        }
        else if (filteredCountries.length > 1) {
            result = filteredCountries.map(c => <div key={c.name}>{c.name}</div>)
        }
        else if (filteredCountries.length === 1) {
            const country = filteredCountries[0]
            result = <Country country={country} />
        }
    }

    return (
        <div>
            find countries <input onChange={handleChange} />
            {result}
        </div>
    )
}

export default App