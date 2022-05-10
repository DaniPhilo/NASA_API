import React, { useState, useEffect } from 'react'

function Image() {

    const [apod, setApod] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchApod() {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=xkG1fcvkAYkhPdGuforBegxaGE1oQtigQNcf6gu3');
            const data = await response.json();
            setApod(data.url);
            setIsLoading(false);
        }

        fetchApod();
    }, []);

    return (
        <section className='image-section'>
            {isLoading ?
                <div>Loading...</div> :
                <img src={apod} alt="" />}
        </section>
    )
}

export default Image