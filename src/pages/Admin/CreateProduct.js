import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const CreateProduct = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState("");

  // Fetch all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      } else {
        toast.error("Failed to fetch categories");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while getting categories");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle create product
  const handleCreate = async (e) => {
    e.preventDefault();

    // Validate fields
    if (!name || !description || !price || !quantity || !category || !photo) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/create-product`,
        productData
      );

      if (data?.success) {
        toast.success("Product Created Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to create product");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while creating the product");
    }
  };

  return (
    <Layout title={"Dashboard - Create Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Create Product</h1>
            <div className="m-1 w-75">
              {/* Category Select */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
              >
                {categories?.length === 0 ? (
                  <Option disabled>No categories found</Option>
                ) : (
                  categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))
                )}
              </Select>

              {/* Upload Photo */}
              <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12">
                  {photo ? photo.name : "Upload Photo"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                  />
                </label>
              </div>

              {/* Display Photo Preview */}
              {photo && (
                <div className="mb-3 text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              )}

              {/* Other Product Details */}
              <input
                type="text"
                value={name}
                placeholder="Product Name"
                className="form-control mb-3"
                onChange={(e) => setName(e.target.value)}
              />
              <textarea
                value={description}
                placeholder="Product Description"
                className="form-control mb-3"
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                type="number"
                value={price}
                placeholder="Product Price"
                className="form-control mb-3"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                value={quantity}
                placeholder="Product Quantity"
                className="form-control mb-3"
                onChange={(e) => setQuantity(e.target.value)}
              />

              {/* Shipping Select */}
              <Select
                bordered={false}
                placeholder="Select Shipping"
                size="large"
                className="form-select mb-3"
                onChange={(value) => setShipping(Number(value))}
              >
                <Option value={0}>No</Option>
                <Option value={1}>Yes</Option>
              </Select>

              {/* Create Product Button */}
              <button className="btn btn-primary" onClick={handleCreate}>
                CREATE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateProduct;
