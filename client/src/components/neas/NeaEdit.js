import React from 'react'

function NeaEdit({ nea, setIsEdit, setNeas, setIsAuthenticated }) {

    const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class } = nea;

    const handleEdit = async (event) => {
        event.preventDefault();

        const editData = {
            designation: event.target.designation.value || event.target.designation.placeholder,
            discovery_date: event.target.discovery_date.value || event.target.discovery_date.placeholder,
            h_mag: event.target.h_mag.value || event.target.h_mag.placeholder,
            moid_au: event.target.moid_au.value || event.target.moid_au.placeholder,
            q_au_1: event.target.q_au_1.value || event.target.q_au_1.placeholder,
            q_au_2: event.target.q_au_2.value || event.target.q_au_2.placeholder,
            period_yr: event.target.period_yr.value || event.target.period_yr.placeholder,
            i_deg: event.target.i_deg.value || event.target.i_deg.placeholder,
            pha: event.target.pha.value || event.target.pha.placeholder,
            orbit_class: event.target.orbit_class.value || event.target.orbit_class.placeholder
        }

        const response = await fetch(`https://vast-castle-72865.herokuapp.com/api/astronomy/neas/edit/${designation}`, {
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
            setNeas(prevState => prevState.map(item => item.designation === designation ? data.neas : item));
            setIsEdit(prevState => !prevState);
        }
    }

    return (
        <form action="" className='edit-form edit-nea-form' onSubmit={handleEdit}>
            <input type="text" name='designation' placeholder={designation} />
            <input type="text" name='discovery_date' placeholder={discovery_date} />
            <input type="text" name='h_mag' placeholder={h_mag} />
            <input type="text" name='moid_au' placeholder={moid_au} />
            <input type="text" name='q_au_1' placeholder={q_au_1} />
            <input type="text" name='q_au_2' placeholder={q_au_2} />
            <input type="text" name='period_yr' placeholder={period_yr} />
            <input type="text" name='i_deg' placeholder={i_deg} />
            <input type="text" name='pha' placeholder={pha} />
            <input type="text" name='orbit_class' placeholder={orbit_class} />
            <button type='submit'>Edit</button>
            <button type='button' onClick={() => setIsEdit(prevState => !prevState)}><i className="fa-solid fa-xmark"></i></button>
        </form>
    )
}

export default NeaEdit