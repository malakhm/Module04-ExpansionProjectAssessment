import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Products from "../pages/dashboard.js";
import Header from "../components/navbar.js";
import EditForms from "../pages/edit.js";
import Signin from "../pages/login.js";
import UserProtectedRoute from "./UserProtectedRoute.js";
import AddForm from "../pages/add.js";
import Home from "../pages/products.js";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/home" element={<Home/>} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/" element={<Products />} />
        </Route>
        <Route element={<UserProtectedRoute />}>
        <Route path="/edit-product" element={<EditForms />} />
        </Route>
        <Route path="signin" element={<Signin />} />
        <Route element={<UserProtectedRoute />}>
          <Route path="/add-product" element={<AddForm/>} />
          </Route>
      </Routes>
    </>
  );
};
export default AppRoutes;
