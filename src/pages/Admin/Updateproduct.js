import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const { Option } = Select;

const Updateproduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  // State management
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState("");
  const [photo, setPhoto] = useState(null);
  const [id, setId] = useState("");

  // Fetch Single Product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/getsingle-product/${params.slug}`
      );
      setName(data?.products?.name);
      setId(data?.products?._id);
      setDescription(data?.products?.description);
      setPrice(data?.products?.price);
      setCategory(data?.products?.category?._id || data.products?.category);
      setQuantity(data?.products?.quantity);
      setShipping(data?.products?.shipping);
    } catch (error) {
      console.error("Error fetching product:", error);
      toast.error("Something went wrong while fetching the product.");
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [params.slug]);

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
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while getting categories.");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  // Handle Update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      photo && productData.append("photo", photo);
      productData.append("category", category);
      productData.append("shipping", shipping);

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        productData
      );

      if (data?.success) {
        toast.success("Product Updated Successfully");
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong while updating the product.");
    }
  };
  //DELETE
  const handleDelete = async () => {
    try {
      let answer = window.prompt("THIS PRODUCT WILL BE DELETED CONFIRM?");
      if (!answer) {
        return;
      }
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`
      );
      navigate("/dashboard/admin/products");

      toast.success("PRODUCT DELETED SUCCESSFULLY");
    } catch (error) {
      toast.error("Something Went Wrong");
      console.log(error);
    }
  };

  return (
    <Layout title={"Dashboard - Update Product"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9">
            <h1>Update Product</h1>
            <div className="m-1 w-75">
              {/* Category Select */}
              <Select
                bordered={false}
                placeholder="Select a category"
                size="large"
                showSearch
                className="form-select mb-3"
                onChange={(value) => setCategory(value)}
                value={category}
              >
                {categories.length === 0 ? (
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

              {/* Photo Preview */}
              <div className="mb-3 text-center">
                <img
                  src={
                    photo
                      ? URL.createObjectURL(photo)
                      : `${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`
                  }
                  alt="product_photo"
                  height="200px"
                  className="img img-responsive"
                />
              </div>

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
                onChange={(value) => setShipping(value === "1" ? 1 : 0)}
                value={shipping ? "Yes" : "No"}
              >
                <Option value="0">No</Option>
                <Option value="1">Yes</Option>
              </Select>

              {/* Update Product Button */}
              <button className="btn btn-primary" onClick={handleUpdate}>
                UPDATE PRODUCT
              </button>
              <button className="btn btn-danger" onClick={handleDelete}>
                DELETE PRODUCT
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Updateproduct;
