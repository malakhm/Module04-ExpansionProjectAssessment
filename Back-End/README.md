# Backend Assessment for Product Application

## Setting up the Backend

1. **Fork Repository**: Begin by forking the backend repository to your local machine.
2. **Create a New Branch**: Create a new branch with the name `firstname-lastname` to work on your project.
3. **Node.js Project**: Set up a new Node.js project for the backend.
4. **Install Dependencies**: Install the required dependencies.
5. **Create database**: Create a new database for the project using SQL.

## Instructions

Develop the backend for the E-commerce application to handle product creation, product retrieval, product updating, and product deletion.

## Requirements

1. **Product Data Model**:

   - Create a product schema using SQL for storing product data.
   - The schema should include fields for title, category, description, price and supplier.
   - All fields should be required.
   - Set timestamps for the schema.

1. **User Registration**:

   - Create APIs for user registration and login.
   - Use bcrypt for password hashing.
   - Differentiate between regular users(view only) and registered product creators.

2. **Product Creation API**:

   - Create an API endpoint for adding new products.
   - The endpoint should accept the product data as a JSON object in the request body.
   - Save the created product to the database, associating them with the logged-in user.

3. **Product Retrieval API**:

   - Create API endpoints to retrieve all products and product by ID

4. **Product Update API**:

   - Create an API endpoint for updating products.
   - Ensure that only the product creator can update their products.

5. **Product Deletion API**:

   - Create an API endpoint for deleting products.
   - Ensure that only the product creator can delete their products.

## Submission

- After implementing the project, stage your changes, commit them, and push to your branch.
