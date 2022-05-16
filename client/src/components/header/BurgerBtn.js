import React from 'react'

function BurgerBtn({ setIsVisible, windowWidth }) {

    const handleNavDisplay = () => {
        setIsVisible(prevState => !prevState);
    }

    return (
        <>
            {windowWidth < 750 &&
                <div className='burger-btn' onClick={handleNavDisplay}>
                    <div className='burger-top'></div>
                    <div className='burger-mid'></div>
                    <div className='burger-bot'></div>
                </div>
            }
        </>
    )
}

export default BurgerBtn