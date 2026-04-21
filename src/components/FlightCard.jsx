import React from 'react'

const FlightCard = ({flight,onBook}) => {
  return (
    <div style={{border:"1px solid gray",padding:"10px",marginTop:"10px"}}>
        <h4>{flight.id}</h4>
        <p>{flight.from} → {flight.to}</p>
        <p>Price: {flight.price} SEK</p>
        <button onClick={()=> onBook(flight.id)}>Book</button>
        <p></p>
    </div>
  )
}

export default FlightCard