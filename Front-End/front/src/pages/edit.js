import React, { useContext } from 'react'
import './editForm.css'
import { useLocation , useNavigate} from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { AuthContext } from '../Context/AuthContext.js'
const EditForms =() =>{
  const navigate = useNavigate();
  const { token } = useContext(AuthContext)
  const location = useLocation();
  const {id,
        Title,
        Price,
        Category,
        Description,
      
        } = location.state || {}
       
  // console.log(id, Name, email)
  //creating states for all fields
  const [title, setTitle] = useState(Title || '')
  const [price, setPrice] = useState(Price || '')
  const [category, setCategory] = useState(Category || '')
  const [description, setDescription] = useState(Description || '')
  const [image, setImage] = useState('')

  const handleEdit = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", title);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("description", description);
      formData.append("image", image);

      const response = await axios.put(
        `http://localhost:8000/api/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
    
      );
      console.log(response)
      navigate("/");
    } catch (error) {
      console.log(error.message)
    }
  };
   
  

  return (
    <>
	<div class="form-bg container">
    <div class="container">
      <div class="row">
        <div class="col-md-offset-3 col-md-6">
          <div class="form-container">
            <h3 class="title">Edit Product</h3>
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
              

          
              <button class="btn signup" onClick={handleEdit}>Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default EditForms
