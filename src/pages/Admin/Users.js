import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "../../components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth, setAuth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/all-users`
      );
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);

  return (
    <Layout title={"All User Data"}>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Users</h1>
          {users.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Address</th>
                  <th scope="col">Role</th>
                  <th scope="col">Joined</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user._id}>
                    <td>{i + 1}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{user.address}</td>
                    <td>{user.role === 1 ? "Admin" : "User"}</td>
                    <td>{moment(user.createdAt).format("LL")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No users found.</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Users;
