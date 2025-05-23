import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import { useAuth } from "../../context/auth";
import moment from "moment";
const Order = () => {
  const [orders, setOrders] = useState([]);
  const [auth, setAuth] = useAuth();

  const getOrders = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`
      );
      // Set orders to the orders array from the response
      setOrders(data); // Make sure to extract the orders array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getOrders();
  }, [auth?.token]);

  return (
    <Layout title={"Dashboard-Orders"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1 className="text-center">ALL ORDERS</h1>
            {orders.length > 0 ? ( // Check if there are orders to display
              orders.map((o, i) => {
                return (
                  <div className="border shadow" key={i}>
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Status</th>
                          <th scope="col">Buyer</th>
                          <th scope="col">Date</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{i + 1}</td>
                          <td>{o?.status}</td>
                          <td>{o?.buyers?.name}</td>
                          <td>{moment(o?.createdAt).fromNow()}</td>
                          <td>{o.payment.success ? "Success" : "Failed"}</td>
                          <td>{o.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="container">
                      {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row">
                          <div className="col-md-4">
                            <img
                              src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                              className="product-image"
                              alt={p.name}
                              width={"100px"}
                              height={"100px"}
                            />
                          </div>
                          <div className="col-md-8">
                            <h5>{p.name}</h5>
                            <p>{p.description.substring(0, 30)}</p>
                            <p>Price: ${p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-center">No orders found.</p> // Message for no orders
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;
