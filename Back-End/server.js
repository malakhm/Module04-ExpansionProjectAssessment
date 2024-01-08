import dotenv from "dotenv";
import express from "express";
import sequelize from "./Config/db.js";
import cors from "cors";
import ProductRouter from "./Routers/ProductsRoutes.js"
import router from './Routers/UsersRoute.js';
import bodyParser from "body-parser";
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(cors());
app.use('/api/products', ProductRouter)
app.use('/api/users', router)
dotenv.config();

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//connecting to db
sequelize.sync({ force: false });

app.listen(process.env.PORT || 5001, ()=>{
  console.log('server running on port ' + process.env.PORT || 5001);
});
