import sequelize from "../Config/db.js";
import { DataTypes } from "sequelize";
import User from "./UsersModel.js";
const Product = sequelize.define(
  'Product',
  {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  category: {
    type: DataTypes.ENUM(["Food" ,"Mobile phones", "Game consoles"]),
    allowNull:false,
    // defaultValue:null
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  image:{
    type: DataTypes.STRING,
    allowNull: false,
  }

}  ,{
  timestamps: true,
});


User.hasMany(Product, { foreignKey: "UserId"});
Product.belongsTo(User, { foreignKey: "UserId" });
export default Product
