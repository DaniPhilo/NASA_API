import React, { useState } from 'react'

import SignIn from './SignIn'
import SignUp from './SignUp'

function AuthenticationForms() {

    const [showSignUp, setShowSignUp] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');


    return (
        <section>
            {showSignUp ?
                <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
                :
                <SignIn showSignUp={showSignUp} setShowSignUp={setShowSignUp} errorMessage={errorMessage} setErrorMessage={setErrorMessage} />
            }
            
            <div className='login-error'>
                <p>{errorMessage}</p>
            </div>
        </section>
    )
}

export default AuthenticationForms