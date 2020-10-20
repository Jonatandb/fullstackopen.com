import React from 'react'

const NotificationMessage = ({ message }) => {

    if (message === null) return null

    const color = message.error ? 'red' : 'green'

    const style = {
        border: `5px solid ${color}`,
        color,
        backgroundColor: '#ccc',
        margin: 5,
        padding: 10,
        borderRadius: 5
    }

    return (
        <div style={style}>
            {message.message}
        </div>
    )
}

export default NotificationMessage