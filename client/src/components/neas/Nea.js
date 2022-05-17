import React, { useState, useContext } from 'react'

import NeaFront from './NeaFront';
import NeaEdit from './NeaEdit';

import { UserContext } from '../../context/user_context';

function Nea({ nea, setNeas }) {

    

    const { setIsAuthenticated } = useContext(UserContext);

    

    const [isEdit, setIsEdit] = useState(false);
    

    

    

    

    return (
        <div className='card-wrapper'>
            {!isEdit ?

                <NeaFront nea={nea} setNeas={setNeas} setIsEdit={setIsEdit} setIsAuthenticated={setIsAuthenticated} />

                :

                <NeaEdit nea={nea} setNeas={setNeas} setIsEdit={setIsEdit} setIsAuthenticated={setIsAuthenticated} />
            }

        </div>
    )
}

export default Nea