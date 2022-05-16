// import React from 'react'

// function LandingFront() {

//     const handleToCart = () => {
//         setLandingsCart(prevState => [...prevState, landing]);
//         setIsInCart(true);
//       }
    
//       const handleDeleteFromCart = () => {
//         setLandingsCart(prevState => prevState.filter(item => item.id !== id));
//         setIsInCart(false);
//       }

//     return (
//         <>

//             <div className="card-title">
//                 <h4>{name}</h4>
//             </div>
//             <div className="card-content">
//                 <div className="card-info">
//                     <p>Class: {recclass}</p>
//                     <p>Mass: {mass}</p>
//                     <p>Date: {year.slice(0, 10)}</p>
//                     <p>Lat: {reclat}</p>
//                     <p>Long: {reclong}</p>
//                 </div>
//                 <div className="card-buttons">
//                     <button type='button' onClick={() => setIsEdit(prevState => !prevState)}><i className="fa-solid fa-pen-to-square"></i></button>
//                     <button type='button' onClick={handleDelete}><i className="fa-solid fa-trash-can"></i></button>
//                     {isInCart ?
//                         <button type='button' onClick={handleDeleteFromCart}><i className="fa-solid fa-cart-shopping"></i></button>
//                         :
//                         <button type='button' onClick={handleToCart}><i className="fa-solid fa-cart-shopping"></i></button>
//                     }
//                 </div>
//             </div>

//         </>
//     )
// }

// export default LandingFront