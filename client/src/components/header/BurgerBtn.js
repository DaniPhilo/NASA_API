import React from 'react'

function BurgerBtn({ setIsVisible }) {

    const handleNavDisplay = () => {
        setIsVisible(prevState => !prevState);
    }

    return (
        <div className='burger-btn' onClick={handleNavDisplay}>
            <div className='burger-top'></div>
            <div className='burger-mid'></div>
            <div className='burger-bot'></div>
        </div>
    )
}

export default BurgerBtn