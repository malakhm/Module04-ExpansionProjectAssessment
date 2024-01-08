import express from "express";
import {getProducts,
        getProduct,
        createProduct,
        updateProduct,
        deleteProduct,
        getProductsByUserId

} from "../Controllers/ProductsController.js";
import Verification from "../Middlewares/jwt.js"
import {upload} from '../Config/cloudinary.js'

const ProductRouter = express.Router();
ProductRouter.get("/", getProducts);
ProductRouter.get("/:id", getProduct);
ProductRouter.post("/", Verification.verifyLogin,upload.single('image'), createProduct);
ProductRouter.delete("/:id", Verification.verifyLogin, deleteProduct);
ProductRouter.put("/:id", Verification.verifyLogin,updateProduct);
ProductRouter.get("/get/:id", getProductsByUserId)
export default ProductRouter;
