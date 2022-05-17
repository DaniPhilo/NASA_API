import React from 'react'

function LandingEdit({ landing, setIsEdit, setLandings, setIsAuthenticated }) {

    const { name, recclass, mass, year, reclat, reclong, id } = landing;

    const handleEdit = async (event) => {
        event.preventDefault();

        const editData = {
            name: event.target.name.value || event.target.name.placeholder,
            id: id,
            recclass: event.target.recclass.value || event.target.recclass.placeholder,
            mass: event.target.mass.value || event.target.mass.placeholder,
            year: event.target.year.value || event.target.year.placeholder,
            reclat: event.target.reclat.value || event.target.reclat.placeholder,
            reclong: event.target.reclong.value || event.target.reclong.placeholder
        }

        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/landings/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(editData)
        });
        if (response.status === 403) {
            return setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.response) {
            setLandings(prevState => prevState.map(item => item.id === id ? data.landings : item));
            setIsEdit(prevState => !prevState);
        }
    }

    return (
        <form action="" className='edit-form' onSubmit={handleEdit}>
            <input type="text" name='name' placeholder={name} />
            <input type="text" name='recclass' placeholder={recclass} />
            <input type="text" name='mass' placeholder={mass} />
            <input type="text" name='year' placeholder={year} />
            <input type="text" name='reclat' placeholder={reclat} />
            <input type="text" name='reclong' placeholder={reclong} />
            <button type='submit'>Edit</button>
            <button type='button' onClick={() => setIsEdit(prevState => !prevState)}><i className="fa-solid fa-xmark"></i></button>

        </form>
    )
}

export default LandingEdit