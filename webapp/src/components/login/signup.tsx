import React, { useState } from 'react';
import { Link } from 'react-router-dom';


export const SignUp = () => {
    const [error, setError] = useState(null);

    return (
        <div className='card'>
            <div className='card-header' >
                {error && <p className='error' >{{ error }}</p>}
                <h1>Sign Up</h1>
            </div>
            <div className='card-body'>
                <form>
                    <input type='email' placeholder='Email' />
                    <input type='password' placeholder='Password' />
                    <input type='password' placeholder='Confirm Password' />
                    <input type='submit' value='Sign Up' />
                </form>
                <p>Do you already have an account? <Link to='/login'>Login</Link> </p>
            </div>

        </div>
    )
}