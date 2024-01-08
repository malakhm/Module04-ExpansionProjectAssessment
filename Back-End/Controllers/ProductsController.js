import Product from "../Models/ProductsModel.js";
import User from "../Models/UsersModel.js";

// Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: User, as: "User" }],
    });
    return res.status(200).json({
      data: products,
      message: "success",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({
      data: null,
      message: error.message,
      status: 400,
    });
  }
};

// Get a single Product
export const getProduct = async (req, res) => {
  const {id} = req.params;
  try {
    const product = await Product.findByPk(id, {
      include: [{ model: User, as: "User" }],
    });
    if (product) {
      return res.status(200).json({
        data: product,
        message: "success",
        status: 200,
      });
    } else {
      res.status(404).json({
        data: null,
        message: `product not found`,
        status: 404,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: "Internal server error",
      status: 500,
    });
  }
};

// Create a new Product
export const createProduct = async (req, res) => {
  const { title, description, category, price, UserId, image } = req.body;
  try {
    if (req.file) {
      const products = await Product.create(
        { title, description,category,price,image: req.file.path, UserId: UserId },
      );
      res.status(201).json({
        data: products,
        message: "Product created successfully!",
        status: 201,
      });
    } else {
      const products = await Product.create(
        { title, description,category, price, UserId:UserId },
        { include: [{ model: User, as: "User" }] }
      );
      res.status(201).json({
        data: products,
        message: "Product created successfully!",
        status: 201,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
      error: true,

    });
  }
};

// Update an existing Product
export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
  const { title, description, category, price, UserId } = req.body;

  const existing = await Product.findByPk(id);
    if (!existing) {
      return res.status(404).json({
        data: null,
        message: `Product with Id: ${id} not found!`,
        status: 404,
      });
    }

    let newImage = existing.image;

    // Check if a new image file is uploaded
    if (req.file) {
      newImage = req.file.path;
    }
    const update = await Product.update(
    { title, description, title, price, image:newImage,UserId:UserId },
      {
        where: { id },
      }
    );

    const updatedProduct = await Product.findByPk(id);
    if (updatedProduct) {
      return res.status(200).json({
        data: update,
        message: `Product with ID: ${id} updated successfully!`,
        status: 200,
      });
    } else {
      return res.status(400).json({
        data: null,
        message: `Failed to update Product with ID: ${id}`,
        status: 400,
      });
    }
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message,
      status: 500,
    });
  }
};

// delete Product
export const deleteProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({
        message: "No Product Found!",
        status: 404,
        error: true,
      });
    }
    const deletedProduct = await Product.destroy({ where: { id } });
    if (deletedProduct) {
      return res.status(200).json({
        message: `Product is deleted!`,
        status: 200,
        error: false,
      });
    } else {
      res.status(400).json({
        message: `Failed to delete Product`,
        status: 400,
        error: true,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
      status: 500,
      error: true,
    });
  }
};

export const getProductsByUserId = async (req, res) => {
  const { id } = req.params;
  try {
    const Products = await Product.findAll({
      where: { UserId: id },
      include: [{ model: User, as: 'User' }],
    });

    if (!Products || Products.length === 0) {
      return res.status(404).json({
        message: 'No Product Found!',
        status: 404,
        error: true,
      });
    } else {
      return res.status(200).json({
        data: Products,
        message: 'success',
        status: 200,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
      status: 500,
      error: true,
    });
  }
};
