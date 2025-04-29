import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Navigate, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";
import "./../style/Details.css";
import Link from "antd/es/typography/Link";

const ProductCard = ({ product }) => (
  <div className="product-card" key={product._id}>
    <img
      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
      className="card-img-top product-image"
      alt={product.name}
      loading="lazy"
    />
    <div className="product-info">
      <h5 className="product-title">{product.name}</h5>
      <p className="product-description">
        {product.description.substring(0, 30)}...
      </p>
      <p className="product-description">PRICE: ${product.price}</p>
      <button className="btn btn-primary m-2">MORE DETAILS</button>
      <button className="btn btn-secondary">ADD TO CART</button>
    </div>
  </div>
);

const ProductDetails = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();

  const params = useParams();
  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);

  //initial details
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);

  //get product
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getsingle-product/${params.slug}`
      );
      setProduct(data?.products);
      getSimilarProduct(data?.products._id, data?.products.category._id);
    } catch (error) {
      console.log(error);
    }
  };

  //get similar product
  const getSimilarProduct = async (pid, cid) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/related-product/${pid}/${cid}`
      );
      setRelatedProducts(data?.products);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <h1>PRODUCT DETAILS</h1>

      <div className="row m-5">
        <div className="col-md-4">
          {product._id && (
            <img
              src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
              className="card-img"
              alt={product.name}
            />
          )}
        </div>
        <div className="col-md-8">
          <div className="mb-3">
            <div className="product-info">
              <div className="details">
                <h1>{product.name}</h1>
                <h4>{product.description}</h4>
                <h4 style={{ fontWeight: "bolder" }}> ${product.price}</h4>

                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    setCart([...cart, product]);
                    localStorage.setItem(
                      "cart",
                      JSON.stringify([...cart, product])
                    );
                    toast.success("Item Added To Cart Successfully");
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row m-4">
        <h2 className="text-center mt-2">YOU MAY ALSO LIKE</h2>
        <div className="products-grid">
          {relatedProducts.length > 0 ? (
            relatedProducts.map((p) => (
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
      </div>
    </Layout>
  );
};

export default ProductDetails;
