import React, { useState } from 'react'

import SignIn from './SignIn'
import SignUp from './SignUp'

function AuthenticationForms() {

    const [showSignUp, setShowSignUp] = useState(true);

    return (
        <section>
            {showSignUp ?
                <SignUp showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
                :
                <SignIn showSignUp={showSignUp} setShowSignUp={setShowSignUp} />
            }
        </section>
    )
}

export default AuthenticationForms