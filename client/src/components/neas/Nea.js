import React, { useState, useContext } from 'react'

import { ShoppingCartContext } from '../../context/shopping_context'
import { UserContext } from '../../context/user_context';

function Nea({ nea, setNeas }) {

    const { designation, discovery_date, h_mag, moid_au, q_au_1, q_au_2, period_yr, i_deg, pha, orbit_class } = nea;

    const { setIsAuthenticated } = useContext(UserContext);

    const { neasCart, setNeasCart } = useContext(ShoppingCartContext);

    const [isEdit, setIsEdit] = useState(false);
    const [isInCart, setIsInCart] = useState(() => {
        const match = neasCart.filter(item => item.designation === designation);
        return match.length > 0 ? true : false
    });

    const handleDelete = async () => {
        const response = await fetch(`http://localhost:3001/api/astronomy/neas/delete/${designation}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            credentials: 'include',
        });
        if (response.status === 403) {
            return setIsAuthenticated(false);
        }
        const data = await response.json();
        if (data.response) {
            //Se modifica el estado del parent para obligarlo a volver a hacer la llamada a la API. De este modo se cargarán los datos de la DB con el landing ya borrado. No es muy elegante: 
            setNeas(prevState => prevState.filter(nea => nea.designation !== designation));
        }
    }

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

        const response = await fetch(`http://localhost:3001/api/astronomy/neas/edit/${designation}`, {
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
            setIsEdit(!isEdit);
        }
    }

    const handleToCart = () => {
        setNeasCart(prevState => [...prevState, nea]);
        setIsInCart(true);
    }

    const handleDeleteFromCart = () => {
        setNeasCart(prevState => prevState.filter(item => item.designation !== designation));
        setIsInCart(false);
    }

    return (
        <div className='card nea-card'>
            {!isEdit ?

                <>
                    <div className="card-title">
                        <h4>{designation}</h4>
                    </div>
                    <div className="card-content">
                        <div className="card-info">
                            <p>Date: {discovery_date.slice(0, 10)}</p>
                            <p>H_Mag: {h_mag}</p>
                            <p>Moid_au: {moid_au}</p>
                            <p>Q_au_1: {q_au_1}</p>
                            <p>Q_au_2: {q_au_2}</p>
                            <p>Period_yr: {period_yr}</p>
                            <p>I_deg: {i_deg}</p>
                            <p>Pha: {pha}</p>
                            <p>Class: {orbit_class}</p>
                        </div>
                        <div className="card-buttons">
                            <button type='button' onClick={() => setIsEdit(() => !isEdit)}><i className="fa-solid fa-pen-to-square"></i></button>
                            <button type='button' onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
                            {isInCart ?
                                <button type='button' onClick={handleDeleteFromCart}><i className="fa-solid fa-cart-shopping"></i></button>
                                :
                                <button type='button' onClick={handleToCart}><i className="fa-solid fa-cart-shopping"></i></button>
                            }
                        </div>
                    </div>

                </>

                :

                <form action="" onSubmit={handleEdit}>
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
                </form>
            }

        </div>
    )
}

export default Nea