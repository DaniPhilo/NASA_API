import React, { useState, useEffect } from 'react'

function Image() {

    const [apod, setApod] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchApod() {
            const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=xkG1fcvkAYkhPdGuforBegxaGE1oQtigQNcf6gu3');
            const data = await response.json();
            setApod(data);
            setIsLoading(false);
        }

        fetchApod();
    }, []);

    return (
        <section className='image-section'>
            {isLoading ?
                <div className="loading"><div className="lds-ring"><div></div><div></div><div></div><div></div></div></div>
                :
                <>
                    <div className="image-container">
                        <h4>{apod.title} ({apod.date})</h4>
                        <img src={apod.url} alt="" />
                    </div>
                    <div className="explanation">
                        <p>{apod.explanation}</p>
                    </div>
                </>
            }
        </section>
    )
}

export default Image