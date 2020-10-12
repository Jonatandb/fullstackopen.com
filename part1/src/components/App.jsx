import React, { useState } from 'react'

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const randomQuoteIndexNumber = () => Math.floor(Math.random() * anecdotes.length)

const Anecdote = ({ text, votes }) => <div>
    <p>{text}</p>
    <p>has {votes} votes</p>
</div>

const App = () => {
    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

    const increaseVoteCount = () => {
        const copyVotes = [...votes]
        copyVotes[selected]++
        setVotes(copyVotes)
    }

    const sortedVotes = [...votes].sort((a, b) => a - b)
    const higherVote = sortedVotes[votes.length - 1]
    const mostVoted = votes.findIndex(v => v === higherVote)

    // Simplified:  const mostVoted = votes.findIndex(v => v === [...votes].sort((a, b) => a - b)[votes.length - 1])

    return (
        <>
            <h1>Anecdote of the day</h1>
            <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
            <button onClick={increaseVoteCount}>vote</button>
            <button onClick={() => setSelected(randomQuoteIndexNumber())}>next anecdote</button>
            <h1>Anecdote with most votes</h1>
            <Anecdote text={anecdotes[mostVoted]} votes={votes[mostVoted]} />
        </>
    )
}

export default App