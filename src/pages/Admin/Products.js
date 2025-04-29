import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import "./../../index.css";
import { Link } from "react-router-dom";
import "./../../style/AdminProducts.css";

const Products = () => {
  const [products, SetProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // Fetch all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      SetProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error);
    }
  };

  // Get Total Product Count
  const getTotal = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-count`
      );
      setTotal(data?.total);
    } catch (error) {
      console.log(error);
    }
  };
  // Load More Products
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      SetProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title="Product List">
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">ALL PRODUCT LIST</h1>

          {/* Use a CSS Grid Container */}
          <div className="products-grid-container">
            {products?.length > 0 ? (
              products?.map((p) => (
                <Link
                  key={p._id}
                  to={`/dashboard/admin/products/${p.slug}`}
                  className="product-link"
                >
                  <div className="card product-card">
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                      className="product-image"
                      alt={p.name}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{p.name}</h5>
                      <p className="card-text">{p.description}.</p>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <h4 className="text-center mt-4">No Products Found</h4>
            )}
          </div>
          <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Load More"}
              </button>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
