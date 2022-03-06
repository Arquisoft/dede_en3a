import React from 'react'

export const Home = () => {
    return (
        <div className='card'>
            <div className='card-header' >
                <img src='https://cdn0.iconfinder.com/data/icons/set-ui-app-android/32/8-512.png' alt='user' className='user-photo' />
            </div>
            <div className='card-body'>
                <h1>Welcome</h1>
                <p>user@gmail.com</p>
                <button className='logout-button' >Log Out</button>
            </div>

        </div>
    )
}