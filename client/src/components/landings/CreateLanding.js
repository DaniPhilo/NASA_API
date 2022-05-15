import React, { useState, useContext } from 'react'
import { UserContext } from '../../context/user_context';

function CreateLanding() {

    const { setIsAuthenticated } = useContext(UserContext);

    const [created, setCreated] = useState(null);

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

        const response = await fetch('http://localhost:3001/api/astronomy/landings/create', {
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

    return (
        <>
            <form action="" onSubmit={handleCreateForm} className='list-form'>

                <h4>Create new landing:</h4>

                <label htmlFor="name">Name: </label>
                <input type="text" name='name' />

                <label htmlFor="id">Id: </label>
                <input type="text" name='id' />

                <label htmlFor="recclass">Class: </label>
                <input type="text" name='recclass' />

                <label htmlFor="mass">Weight: </label>
                <input type="text" name='mass' />

                <label htmlFor="year">Date: </label>
                <input type="text" name='year' />

                <label htmlFor="reclat">Latitude: </label>
                <input type="text" name='reclat' />

                <label htmlFor="reclong">Longitude: </label>
                <input type="text" name='reclong' />

                <input type='submit' value='Create' />
            </form>

            {created === 'success' && <p>New landing created.</p>}
            {created === 'failure' && <p>Incorrect parameters. Please, try again..</p>}
        </>
    )
}

export default CreateLanding