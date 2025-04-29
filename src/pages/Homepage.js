import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import "./../style/Homepage.css";
import { Checkbox, Radio } from "antd";
import { Prices } from "../components/Prices";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import Link from "antd/es/typography/Link";
const Homepage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  // Get ALL PRODUCTS
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-list/${page}`
      );
      setLoading(false);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log("Error fetching products:", error);
    }
  };

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Get Filtered Products
  const filteredProduct = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filter`,
        { checked, radio }
      );
      setProducts(data?.products);
    } catch (error) {
      console.log("Error fetching filtered products:", error);
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
      setProducts([...products, ...data?.products]);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Category Filter Handler
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    } else {
      all = all.filter((c) => c !== id);
    }
    setChecked(all);
  };

  // useEffect Hooks for API Calls
  useEffect(() => {
    getAllCategory();
    getTotal();
    getAllProducts();
  }, []);

  useEffect(() => {
    if (checked.length || radio.length) filteredProduct();
    else getAllProducts();
  }, [checked, radio]);

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page]);

  return (
    <Layout title={"All Product - Best Offers"}>
      <div className="row">
        <div className="col-md-2 mt-3">
          <h6 className="text-center">Filter By Category</h6>
          <div className="d-flex flex-column">
            {categories?.map((c) => (
              <Checkbox
                key={c._id}
                onChange={(e) => handleFilter(e.target.checked, c._id)}
              >
                {c.name}
              </Checkbox>
            ))}
          </div>

          {/* PRICE FILTER */}
          <h6 className="text-center mt-4">Filter By Price</h6>
          <div className="d-flex flex-column">
            <Radio.Group onChange={(e) => setRadio(e.target.value)}>
              {Prices?.map((p) => (
                <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                </div>
              ))}
            </Radio.Group>
          </div>

          {/* RESET FILTERS */}
          <div className="d-flex flex-column">
            <button
              className="btn btn-danger mt-4"
              onClick={() => {
                setChecked([]);
                setRadio([]);
                getAllProducts();
              }}
            >
              RESET FILTERS
            </button>
          </div>
        </div>

        <div className="col-md-9">
          <h1 className="text-center">All Products</h1>
          <div className="products-grid">
            {products?.length > 0 ? (
              products?.map((p) => (
                <Link onClick={() => navigate(`/products/${p.slug}`)}>
                  <div className="product-card" key={p._id}>
                    <img
                      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                      className="product-image"
                      alt={p.name}
                    />
                    <div className="product-info">
                      <h5 className="product-title">
                        <Link
                          className="Linkforproductname"
                          onClick={() => navigate(`/products/${p.slug}`)}
                        >
                          {p.name}
                        </Link>
                      </h5>

                      {/* DESCRIPTION */}

                      {/* <p className="product-description">
                      {p.description.substring(0, 30)}...
                    </p> */}
                      <p className="product-description"> ${p.price}</p>

                      {/* //Details */}

                      {/* <button
                      className="btn btn-primary m-2"
                      onClick={() => navigate(`/products/${p.slug}`)}
                    >
                      MORE DETAILS
                    </button> */}
                      {/* <button
                      className="btn btn-secondary"
                      onClick={() => {
                        setCart([...cart, p]);
                        localStorage.setItem(
                          "cart",
                          JSON.stringify([...cart, p])
                        );
                        toast.success("Item Added To Cart Successfully");
                      }}
                    >
                      ADD TO CART
                    </button> */}
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

export default Homepage;
