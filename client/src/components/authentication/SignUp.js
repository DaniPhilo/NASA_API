import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import { UserContext } from '../../context/user_context'

function SignUp({ setShowSignUp }) {

    const { setIsAuthenticated } = useContext(UserContext);

    const [errorMessage, setErrorMessage] = useState('');

    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();

        const data = {
            name: event.target.name.value,
            email: event.target.email.value,
            password: event.target.password.value,
            password2: event.target.password2.value,
        }

        const request = await fetch('http://localhost:3001/api/auth/signUp', {
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
            return setErrorMessage(response.full_error.message);
        }

        setIsAuthenticated(true);
        navigate('/home');
        return
    }

    const showSignIn = () => {
        setShowSignUp(false);
    }

    return (
        <div className="signing-container">
            <h3>Sign Up</h3>
            <form onSubmit={handleSignUp}>
                <label htmlFor="name">Name: </label>
                <input type="text" name='name' />

                {errorMessage.includes('name') &&
                    <div className='login-error'>
                        <p>Invalid name.</p>
                    </div>}

                <label htmlFor="email">Email: </label>
                <input type="text" name='email' />

                {errorMessage.includes('email') &&
                    <div className='login-error'>
                        <p>Invalid email.</p>
                    </div>}

                <label htmlFor="password">Password: </label>
                <input type="password" name='password' />

                {errorMessage.includes('password') &&
                    <div className='login-error'>
                        <p>Invalid password.</p>
                    </div>}

                <label htmlFor="password2">Repeat password: </label>
                <input type="password" name='password2' />

                <button type='submit'>Sign Up</button>
            </form>
            <p className='show-signIn' onClick={showSignIn}>I already have an account.</p>
        </div>
    )
}

export default SignUp