import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/user_context'

function SignIn({ setShowSignUp }) {

    const { setIsAuthenticated } = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSignIn = async (event) => {
        event.preventDefault();

        const data = {
            email: event.target.email.value,
            password: event.target.password.value
        }

        const request = await fetch('http://localhost:3001/api/auth/signIn', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        });

        const response = await request.json();
        if (!response.authenticated) {
            console.log(response.message);
            setErrorMessage('Wrong username or password.');
            return
        }
        setIsAuthenticated(true);
        navigate('/home');
    }

    return (
        <div className="signing-container">
            <h3>Sign In</h3>
            <form onSubmit={handleSignIn}>
                <label htmlFor="email">Email: </label>
                <input type="text" name='email' />

                <label htmlFor="password">Password: </label>
                <input type="password" name='password' />

                <button type='submit'>Sign In</button>
            </form>
            {errorMessage &&
                <div className='login-error'>
                    <p>{errorMessage}</p>
                </div>}
            <p className='show-signIn' onClick={() => setShowSignUp(true)}>I don't have an account yet.</p>
        </div>
    )
}

export default SignIn