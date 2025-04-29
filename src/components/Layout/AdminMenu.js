import React from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
  return (
    <>
      <div className="text-center">
        <div className="list-group">
          <h4>ADMIN PANEL</h4>
          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action"
          >
            CATEGORY
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action"
          >
            CREATE PRODUCTS{" "}
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action"
          >
            PRODUCTS{" "}
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            className="list-group-item list-group-item-action"
          >
            {" "}
            USERS{" "}
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action"
          >
            {" "}
            ALL ORDERS{" "}
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;
