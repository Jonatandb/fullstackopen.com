import React from 'react'

const NotificationMessage = ({ message }) => {
    const styles = {
        border: '5px solid green',
        color: 'green',
        backgroundColor: '#ccc',
        margin: 5,
        padding: 10,
        borderRadius: 5
    }

    if (message === null) return null

    return (
        <div style={styles}>
            {message}
        </div>
    )
}

export default NotificationMessage