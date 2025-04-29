// import logo from './logo.svg';
// import './App.css';
// import Layout from './components/Layout/Layout';
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import About from "./pages/About";
import Policy from "./pages/Policy";
import Contact from "./pages/Contact";
import PagenotFound from "./pages/PagenotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Forgotpass from "./pages/Auth/Forgotpass";
import Dashbord from "./pages/user/Dashbord";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import AdminDashboard from "./pages/Admin/AdminDashboard";
import Users from "./pages/Admin/Users";
import CreateProduct from "./pages/Admin/CreateProduct";
import CreateCategory from "./pages/Admin/CreateCategory";
import Order from "./pages/user/Order";
import Profile from "./pages/user/Profile";
import Products from "./pages/Admin/Products";
import Updateproduct from "./pages/Admin/Updateproduct";
import Search from "./pages/Search";
import ProductDetails from "./pages/ProductDetails";
import Categories from "./pages/Categories";
import CategoryProduct from "./pages/CategoryProduct";
import Cartpage from "./pages/Cartpage";
import AdminOrders from "./pages/Admin/AdminOrders";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<Cartpage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path="/search" element={<Search />} />

      <Route path="/dashboard" element={<PrivateRoute />}>
        <Route path="user" element={<Dashbord />} />
        <Route path="user/orders" element={<Order />} />
        <Route path="user/profile" element={<Profile />} />
      </Route>

      <Route path="/dashboard" element={<AdminRoute />}>
        <Route path="admin" element={<AdminDashboard />} />

        <Route path="admin/create-category" element={<CreateCategory />} />
        <Route path="admin/create-product" element={<CreateProduct />} />
        <Route path="admin/products/:slug" element={<Updateproduct />} />
        <Route path="admin/products" element={<Products />} />
        <Route path="admin/users" element={<Users />} />
        <Route path="admin/orders" element={<AdminOrders />} />
      </Route>

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Forgotpass" element={<Forgotpass />} />
      <Route path="/About" element={<About />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/Policy" element={<Policy />} />
      <Route path="*" element={<PagenotFound />} />
    </Routes>
  );
}

export default App;
