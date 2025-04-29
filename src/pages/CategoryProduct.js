import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
const CategoryProduct = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [cart, setCart] = useCart();

  const params = useParams();
  useEffect(() => {
    if (params?.slug) getProductsbycat();
  }, [params?.slug]);
  const getProductsbycat = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/product-category/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <h2 className="text-center">{category?.name}</h2>
      <h5 className="text-center">{products?.length} result found</h5>
      <h1 className="text-center">All Products</h1>
      <div className="products-grid">
        {products?.length > 0 ? (
          products?.map((p) => (
            <div className="product-card" key={p._id}>
              <img
                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${p._id}`}
                className="product-image"
                alt={p.name}
              />
              <div className="product-info">
                <h5 className="product-title">{p.name}</h5>
                <p className="product-description">
                  {p.description.substring(0, 30)}...
                </p>
                <p className="product-description">${p.price}</p>
                <button
                  className="btn btn-primary m-2"
                  onClick={() => navigate(`/products/${p.slug}`)}
                >
                  MORE DETAILS
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setCart([...cart, p]);
                    localStorage.setItem("cart", JSON.stringify([...cart, p]));
                    toast.success("Item Added To Cart Successfully");
                  }}
                >
                  ADD TO CART
                </button>{" "}
              </div>
            </div>
          ))
        ) : (
          <h4 className="text-center mt-4">No Products Found</h4>
        )}
      </div>
    </Layout>
  );
};

export default CategoryProduct;
