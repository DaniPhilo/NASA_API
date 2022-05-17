import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/user_context';

function CreateLanding() {

    const { setIsAuthenticated } = useContext(UserContext);

    const [created, setCreated] = useState(null);
    const [isScaled, setIsScaled] = useState(true);

    const handleCreateForm = async (event) => {
        event.preventDefault();

        const landingData = {
            name: event.target.name.value,
            id: event.target.id.value,
            recclass: event.target.recclass.value,
            mass: event.target.mass.value,
            year: event.target.year.value,
            reclat: event.target.reclat.value,
            reclong: event.target.reclong.value
        }

        const response = await fetch('https://vast-castle-72865.herokuapp.com/api/astronomy/landings/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(landingData)
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
            <button type='button' onClick={() => setIsScaled(prevState => !prevState)} className={isScaled ? 'launch-create-form' : 'scaled'}>Create Landing</button>

            <aside className={isScaled ? 'create-aside scaled' : 'create-aside'}>

                <form action="" onSubmit={handleCreateForm} className='create-form'>

                    <h4>Create new landing:</h4>

                    <div>
                        <label htmlFor="name">Name: </label>
                        <input type="text" name='name' />
                    </div>
                    <div>
                        <label htmlFor="id">Id: </label>
                        <input type="text" name='id' />
                    </div>
                    <div>
                        <label htmlFor="recclass">Class: </label>
                        <input type="text" name='recclass' />
                    </div>
                    <div>
                        <label htmlFor="mass">Weight: </label>
                        <input type="text" name='mass' />
                    </div>
                    <div>
                        <label htmlFor="year">Date: </label>
                        <input type="text" name='year' />
                    </div>
                    <div>
                        <label htmlFor="reclat">Latitude: </label>
                        <input type="text" name='reclat' />
                    </div>
                    <div>
                        <label htmlFor="reclong">Longitude: </label>
                        <input type="text" name='reclong' />
                    </div>

                    <button type='submit' className='create-button'>Create</button>

                    <button type='button' className='close-button' onClick={handleCloseForm}><i className="fa-solid fa-xmark"></i></button>
                </form>

                {created === 'success' &&
                    <div className='success-message'>
                        <p>New landing created.</p>
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

export default CreateLanding