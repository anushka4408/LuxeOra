import React from "react";
import Layout from "../components/Layout/Layout";
import useCategory from "../hooks/useCategory";
import { Link } from "react-router-dom";
import "./../style/Categories.css";
const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <h1 className="text-center">All Categories</h1>
      <div className="container">
        <div className="categories-grid">
          {categories.map((c) => (
            <Link to={`/category/${c.slug}`} className="category-link">
              <div className="category-card" key={c._id}>
                <div className="category-name">{c.name}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
