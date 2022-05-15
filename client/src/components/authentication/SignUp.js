import React from 'react'

import axios from 'axios'

function SignUp({ setShowSignUp }) {

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
        // const response = await axios.post('http://localhost:3001/api/auth/signUp',
        //     { data },
        //     { withCredentials: true })
        //     .then(response => response.data);
        if (!response.authenticated) {
            console.log(response.message);
        }
        console.log(`Authenticated: ${response.message}`);
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

                <label htmlFor="email">Email: </label>
                <input type="text" name='email' />

                <label htmlFor="password">Password: </label>
                <input type="password" name='password' />

                <label htmlFor="password2">Repeat password: </label>
                <input type="password" name='password2' />

                <button type='submit'>Sign Up</button>
            </form>
            <p className='show-signIn' onClick={showSignIn}>I already have an account.</p>
        </div>
    )
}

export default SignUp