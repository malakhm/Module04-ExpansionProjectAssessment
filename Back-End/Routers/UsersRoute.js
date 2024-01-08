import express from "express";
import {
  createUser,
  getUsers,
  getUser,
  deleteUser,
  updateUser,
  signInUser,
} from "../Controllers/UsersController.js";
// import Verification from "../Middleware/jwt.js";
const router = express.Router();
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.delete("/:id", deleteUser);
router.put(
  "/:id",
 
  updateUser
);
router.post("/sign", signInUser);
export default router;
