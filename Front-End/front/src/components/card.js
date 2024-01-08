import React from 'react'

const Card = (props) =>{
  return (
    <div>
        <div className="card-component">
            <img src={props.image} width='100%' height='100%'/>
            <div>
                <h4>name: {props.title}</h4>
                <p>description: {props.description}</p>
                <p>price: {props.price}</p>
                <p>category: {props.category}</p>
                <p>supplier: {props.user}</p>
            </div>
        </div>
        
      
    </div>
  )
}

export default Card
