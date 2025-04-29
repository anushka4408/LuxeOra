import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const ProductCard = ({ product, navigate, cart, setCart }) => (
  <div className="product-card">
    <img
      src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product._id}`}
      className="product-image"
      alt={product.name}
      loading="lazy"
    />
    <div className="product-info">
      <h5 className="product-title">{product.name}</h5>
      <p className="product-description">
        {product.description.substring(0, 30)}...
      </p>
      <p className="product-description">PRICE: ${product.price}</p>
      <button
        className="btn btn-primary m-2"
        onClick={() => navigate(`/products/${product.slug}`)}
      >
        MORE DETAILS
      </button>
      <button
        className="btn btn-secondary"
        onClick={() => {
          setCart([...cart, product]);
          localStorage.setItem("cart", JSON.stringify([...cart, product]));
          toast.success("Item Added To Cart Successfully");
        }}
      >
        ADD TO CART
      </button>
    </div>
  </div>
);

const Search = () => {
  const [values] = useSearch();
  const [cart, setCart] = useCart();
  const navigate = useNavigate();

  return (
    <Layout title={"Search Results"}>
      <div className="container">
        <div className="text-center">
          <h1>Search Results</h1>
          <h6>
            {values?.results.length < 1
              ? "No Products Found"
              : `Found ${values?.results.length} product(s)`}
          </h6>
          <div className="products-grid">
            {values?.results.length > 0 ? (
              values.results.map((p) => (
                <ProductCard
                  product={p}
                  navigate={navigate}
                  cart={cart}
                  setCart={setCart}
                  key={p._id}
                />
              ))
            ) : (
              <h4 className="text-center mt-4">No Products Found</h4>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
