import React, { useState, useContext } from 'react'

import LandingFront from './LandingFront';
import LandingEdit from './LandingEdit';

import { UserContext } from '../../context/user_context';

function Landing({ landing, setLandings }) {

  const { setIsAuthenticated } = useContext(UserContext);

  const [isEdit, setIsEdit] = useState(false);

  return (
    <div className="card-wrapper">
      {!isEdit ?

        <LandingFront landing={landing} setLandings={setLandings} setIsEdit={setIsEdit} setIsAuthenticated={setIsAuthenticated} />

        :

        <LandingEdit landing={landing} setIsEdit={setIsEdit} setLandings={setLandings} setIsAuthenticated={setIsAuthenticated} />
      }
    </div>

  )
}

export default Landing