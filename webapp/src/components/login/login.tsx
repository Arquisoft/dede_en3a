import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [error, setError] = useState(null);
    return (
        <div className='card'>
            <div className='card-header' >
                {error && <p className='error' >{{ error }}</p>}
                <h1>Log In</h1>
            </div>
            <div className='card-body'>
                <form>
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input type='submit' value='Log In' />
                </form>
                <p>Don't have an account? <Link to='/signup'>Sign Up</Link> </p>
            </div>

        </div>
    )
}