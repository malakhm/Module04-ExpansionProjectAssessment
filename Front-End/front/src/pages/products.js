import React from 'react'
import axios from 'axios'
import Card from '../components/card.js'
import { useState, useEffect } from 'react'
const Home = () =>{
    const [data, setData] = useState([])
    const fetch = async()=>{
        try{
            const response = await axios.get(`http://localhost:4000/api/products/`)
            setData(response.data)
            console.log(response)

        }catch(err){console.log(err.message)

    }}
  return (
    <div>
        {data.map((item)=>(
        <Card 
        title={item.title}
        description={item.description}
        price={item.price}
        category={item.category}
        user={item.User.username}
        />
        ))}
      
    </div>
  )
}

export default Home
