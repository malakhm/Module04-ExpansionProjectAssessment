import DataTable from 'react-data-table-component';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { CiEdit } from "react-icons/ci";
import Button from 'react-bootstrap/Button';
import { FaTrashCan } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import {AuthContext} from '../Context/AuthContext.js'
import Header from '../components/navbar.js';

//custom styling for the table 
const customStyles = {
	headRow: {
	  style: {
		border: 'none',
	  },
	},
	headCells: {
	  style: {
		color: '#FFFFFF',
		backgroundColor: '#DA9100',
		fontSize: '16px', // Adjust the font size for header cells
		marginLeft: '-12px',
	  },
	},
	rows: {
	  style: {
		marginBottom: '-10px', // Adjust the spacing between rows
	  },
	  highlightOnHoverStyle: {
		backgroundColor: '#e2f0fb',
		borderBottomColor: '#FFFFFF',
		outline: '1px solid #FFFFFF',
	  },
	},
	cells: {
	  style: {
		fontSize: '14px', // Adjust the font size for regular cells
		paddingTop: '20px', // Adjust the padding for regular cells
		paddingBottom: '10px',
	  },
	},
	pagination: {
	  style: {
		marginTop:'30px',
		border: 'none',
	  },
	},
  };


//code for fixed header
const FixedHeaderStory = ({ fixedHeaderScrollHeight }) => {
	const nav = ()=>{
		navigate('/add-product')
	}
	const [data, setData] = useState([])
	const navigate = useNavigate()
	const { token } = useContext(AuthContext)

	const handleDelete = async (id) => {
		Swal.fire({
		  title: "Are you sure you want to delete?",
		  icon: "question",
		  iconHtml: "?",
		  confirmButtonText: "Delete",
		  cancelButtonText: "Cancel",
		  showCancelButton: true,
		  showCloseButton: true,
		}).then(async (result) => {
		  if (result.isConfirmed) {
			try {
			  // Assuming 'id' is defined somewhere in your code
			  const response = await axios.delete(
				`http://localhost:8000/api/products/${id}`,{headers:{Authorization: `Bearer ${token}`}}
			  );
	  
			  Swal.fire({
				title: "Deleted!",
				text: "Your file has been deleted.",
				icon: "success",
				
			  });
			} catch (err) {
			  console.log(err);
			}
		  }
		});
	  };
	  
	//create the table structure
	const columns = [
		{
			name: 'id',
			selector: row => row.id,
			sortable: true,
			reorder: true,
		},{
			name: 'title',
			selector: row => row.title,
			sortable: true,
			reorder: true,
		},
        {
			name: 'image',
			selector: row => <img src={row.image} width='80px' height='80px'/>,
			sortable: true,
			reorder: true,
		},
		{
			name: 'description',
			selector: row => row.description,
			sortable: true,
			reorder: true,
		},
    {
			name: 'category',
			selector: row => row.category,
			sortable: true,
			reorder: true,
		},
        {
			name: 'price',
			selector: row => row.price,
			sortable: true,
			reorder: true,
		},
        {
			name: 'supplier',
			selector: row => row.User.username,
			sortable: true,
			reorder: true,
		},
       
	
	
		{
			name: 'Edit',
			cell: (row) => 
			<Link to="/edit-product" 
			state={{id:row.id,
					Title: row.title,
                    Description: row.description,
                    Category:row.category,
                    Price:row.price,
					Image:row.image,

					}}>
				<CiEdit className='table-icon-main-component edit'id={row.id}>Edit</CiEdit>
			</Link>,
			sortable: true,
			reorder: true,
		},
		{
			name: 'Delete',
			cell: (row) => <FaTrashCan  className='table-icon-main-component delete' onClick={() => handleDelete(row.id)} id={row.id}>Delete</FaTrashCan>,
			sortable: true,
			reorder: true,
		},
		

	{
	
	}
	]
	//fetch the data
	const fetchdata = async()=>{
	try{
		const response = await axios.get('http://localhost:8000/api/products/');
		if(response.status == 200){
		setData(response.data.data)
		}
		console.log(response.data.data)
	}
	catch(err){
		console.error(err.message)
	}
	
	}
	useEffect(()=>{
	fetchdata();
	},[])

	return(
		<>
    <Header/>

		<div className='table-main-component-new d-flex flex-column'> 
		<button className="btn btn-blue Add-company-dashboard-admin " onClick={()=>nav()}>
					Add Product
				</button>
		<DataTable
		columns={columns}
		data = {data}
		fixedHeader
		highlightOnHover
		customStyles={customStyles}
		fixedHeaderScrollHeight={fixedHeaderScrollHeight}
		pagination
		/>
	</div>
	</>
	)
}


const Template = args => <FixedHeaderStory {...args} />;

const Products = Template.bind({});

Products.args = {
	fixedHeaderScrollHeight: '300px',
};

export default Products;