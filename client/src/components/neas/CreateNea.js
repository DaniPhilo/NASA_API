import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/user_context';

function CreateNea() {

    const { setIsAuthenticated } = useContext(UserContext);

    const [created, setCreated] = useState(null);
    const [isScaled, setIsScaled] = useState(true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const neaData = {
            designation: event.target.designation.value,
            discovery_date: event.target.discovery_date.value,
            h_mag: event.target.h_mag.value,
            moid_au: event.target.moid_au.value,
            q_au_1: event.target.q_au_1.value,
            q_au_2: event.target.q_au_2.value,
            period_yr: event.target.period_yr.value,
            i_deg: event.target.i_deg.value,
            pha: event.target.pha.value,
            orbit_class: event.target.orbit_class.value
        }
        const response = await fetch('https://vast-castle-72865.herokuapp.com/api/astronomy/neas/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(neaData)
        });
        if (response.status === 403) {
            return setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.response) {
            setCreated('success');
        }
        else {
            setCreated('failure');
        }
    }

    const handleCloseForm = () => {
        setIsScaled(prevState => !prevState);
        setCreated('');
    }


    return (
        <>
            <button type='button' onClick={() => setIsScaled(prevState => !prevState)} className={isScaled ? 'launch-create-form' : 'scaled'}>Create NEA</button>

            <aside className={isScaled ? 'create-aside scaled' : 'create-aside'}>

                <form action="" onSubmit={handleSubmit} className='create-form create-nea-form'>

                    <h4>Create new NEA:</h4>

                    <div>
                        <label htmlFor="designation">Designation: </label>
                        <input type="text" name='designation' />
                    </div>
                    <div>
                        <label htmlFor="discovery_date">Date: </label>
                        <input type="text" name='discovery_date' />
                    </div>
                    <div>
                        <label htmlFor="h_mag">H_mag: </label>
                        <input type="text" name='h_mag' />
                    </div>
                    <div>
                        <label htmlFor="moid_au">Moid_au: </label>
                        <input type="text" name='moid_au' />
                    </div>
                    <div>
                        <label htmlFor="q_au_1">Q_au_1: </label>
                        <input type="text" name='q_au_1' />
                    </div>
                    <div>
                        <label htmlFor="q_au_2">Q_au_2: </label>
                        <input type="text" name='q_au_2' />
                    </div>
                    <div>
                        <label htmlFor="period_yr">Period_yr: </label>
                        <input type="text" name='period_yr' />
                    </div>
                    <div>
                        <label htmlFor="i_deg">I_deg: </label>
                        <input type="text" name='i_deg' />
                    </div>
                    <div>
                        <label htmlFor="pha">Pha: </label>
                        <input type="text" name='pha' />
                    </div>
                    <div>
                        <label htmlFor="orbit_class">Orbit_class: </label>
                        <input type="text" name='orbit_class' />
                    </div>

                    <button type='submit' className='create-button'>Create</button>

                    <button type='button' className='close-button' onClick={handleCloseForm}><i className="fa-solid fa-xmark"></i></button>

                </form>

                {created === 'success' &&
                    <div className='success-message'>
                        <p>New NEA created.</p>
                    </div>
                }
                {created === 'failure' &&
                    <div className='error-message'>
                        <p>Incorrect parameters. Please, try again..</p>
                    </div>}

            </aside>
        </>
    )
}

export default CreateNea