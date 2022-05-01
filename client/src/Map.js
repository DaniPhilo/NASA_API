import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import './styles/styles.scss'

function Map() {

    const [landings, setLandings] = useState([]);

    useEffect(() => {
        const fetchLandings = async () => {
            const response = await fetch('http://localhost:3001/api/astronomy/landings/minMass/0');
            const data = await response.json();
            if (data.response) {
                setLandings(data.landings);
            }

        }

        fetchLandings();
    }, []);

    const handleSubmitByWeight = async (event) => {
        event.preventDefault();

        const weight = event.target.weight.value;
        const response = await fetch(`http://localhost:3001/api/astronomy/landings/minMass/${weight}`);
        const data = await response.json();
        if (data.response) {
            setLandings(data.landings);
        }
    }

    const handleSubmitByClass = async (event) => {
        event.preventDefault();

        const _class = event.target._class.value;
        const response = await fetch(`http://localhost:3001/api/astronomy/landings/class/${_class}`);
        const data = await response.json();
        if (data.response) {
            setLandings(data.landings);
        }
    }

    return (
        <>
            <form action="" onSubmit={handleSubmitByWeight}>
                <label htmlFor="weight">Filter by weight: </label>
                <input type="number" name="weight" />
                <button type='submit'>Filter</button>
            </form>
            <form action="" onSubmit={handleSubmitByClass}>
                <label htmlFor="_class">Filter by class: </label>
                <input type="text"  name="_class"/>
                <button type='submit'>Filter</button>
            </form>

            <MapContainer center={[30, 0]} zoom={2} scrollWheelZoom={false}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {landings.length > 0 && landings.map(landing => {
                    const { name, recclass, mass, year, reclat, reclong, _id } = landing;
                    if (reclat && reclong) {
                        return (
                            <Marker key={_id} position={[reclat, reclong]}>
                                <Popup>Name: {name}, Class: {recclass}, Mass: {mass}, Date: {year && year.slice(0, 10)}, Lat: {reclat}, Long: {reclong}</Popup>
                            </Marker>
                        )
                    }
                })}
            </MapContainer>
        </>
    );

}

export default Map