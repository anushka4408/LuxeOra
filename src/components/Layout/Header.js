import React from "react";
import { NavLink, Link } from "react-router-dom";
import { PiHandbagFill } from "react-icons/pi";
import { useAuth } from "../../context/auth";
import { toast } from "react-hot-toast";
import Searchinput from "../Form/Searchinput";
import useCategory from "../../hooks/useCategory";
import { useCart } from "../../context/cart";
import { Badge } from "antd";
import Avatar from "antd/es/avatar/avatar";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const [cart] = useCart();
  const categories = useCategory();

  const handleLogout = () => {
    setAuth({ ...auth, user: null, token: "" });
    localStorage.removeItem("auth");
    toast.success("LOGGED OUT SUCCESSFULLY");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarTogglerDemo01"
          aria-controls="navbarTogglerDemo01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
          <Link to="/" className="navbar-brand">
            LuxeOra
          </Link>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <Searchinput />
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? "nav-link active" : "nav-link"
                }
              >
                HOME
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to={"/categories"}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={`/categories`}>
                    All Categories
                  </Link>
                </li>

                {categories?.map((c) => (
                  <li key={c.id}>
                    <Link className="dropdown-item" to={`/category/${c.slug}`}>
                      {c.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
            {!auth.user ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/register"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    REGISTER
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) =>
                      isActive ? "nav-link active" : "nav-link"
                    }
                  >
                    LOGIN
                  </NavLink>
                </li>
              </>
            ) : (
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {auth.user.name}
                </NavLink>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink
                      to={`/dashboard/${
                        auth.user.role === 1 ? "admin" : "user"
                      }`}
                      className="dropdown-item"
                    >
                      DASHBOARD
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      onClick={handleLogout}
                      to="/login"
                      className="dropdown-item"
                    >
                      LOGOUT
                    </NavLink>
                  </li>
                </ul>
              </li>
            )}
            <li className="nav-item">
              <Badge count={cart?.length} showZero>
                <NavLink to="/cart" className="nav-link">
                  <PiHandbagFill /> CART
                </NavLink>
              </Badge>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
