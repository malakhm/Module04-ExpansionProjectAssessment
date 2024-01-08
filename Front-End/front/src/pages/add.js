import React, { useContext } from 'react'
import './editForm.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext.js'
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
const AddForm =() =>{
const { token, user } = useContext(AuthContext)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
const [image, setImage] = useState('');
  const navigate = useNavigate()
const handleSubmit= async(e)=>{
  e.preventDefault();
  
    try {
        const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", image);
      formData.append("UserId", user.id);
      const response = await axios.post(`http://localhost:8000/api/products/`,
        formData
   ,{
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  }) 
    if(response.status === 201){
      navigate('/')
    }
  
  
  }catch(err){
    if(err.response && err.response.status === 409){
    }
      console.error(err.code);
    }
  }
  
  

  
  return (
    <>
  <div class="form-bg container">
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <div class="form-container">
            <h3 class="title">Add Product</h3>
            <form class="form-horizontal">
              <div class="form-group">
                <label>Title</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="product"
                  onChange={(e)=>setTitle(e.target.value)}
                  value={title}
                />
              </div>
              <div class="form-group">
                <label>Description</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="product description"
                  onChange={(e)=>setDescription(e.target.value)}
                  value={description}
                />
              </div>
              <div class="form-group">
                <label>Image</label>
                <input
                  type="file"
                  class="form-control"
       
                  onChange={(e)=>setImage(e.target.files[0])}

                  
                />
                <div class="form-group">
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={category}
                      label="Category"
                      onChange={(e) => setCategory(e.target.value)}
                    >
                      
                      <MenuItem value="Food">Food</MenuItem>
                      <MenuItem value="Food">Food</MenuItem>
                      <MenuItem value="Food">Food</MenuItem>
                  
                    </Select>
                  </div>
              </div>
              <div class="form-group">
                <label>Price</label>
                <input
                  type="number"
                  class="form-control"
                  placeholder="Location"
                  value={price}
                  onChange={(e)=>setPrice(e.target.value)}
                  
                />
              </div>
              

          
              <button class="btn signup" onClick={handleSubmit}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )

  }
export default AddForm
