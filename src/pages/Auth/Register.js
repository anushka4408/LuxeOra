import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper function for validating input
  const validateInputs = () => {
    if (!name || !email || !address || !phone || !password || !question) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone number must be 10 digits.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    // Enhanced password complexity check
    if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        password
      )
    ) {
      toast.error(
        "Password must include uppercase, lowercase, a number, and a special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setLoading(true);
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        {
          name,
          email,
          address,
          phone,
          password,
          question,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        // Redirect to a welcome page or confirmation message
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="REGISTRATION">
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit} aria-labelledby="register-form">
          <div className="mb-3">
            <label htmlFor="Name" className="form-label">
              Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="Name"
              aria-required="true"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Phone" className="form-label">
              Phone Number
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="Phone"
              aria-required="true"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Address" className="form-label">
              Address
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="Address"
              aria-required="true"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Question" className="form-label">
              What is your Mother's middle name?
            </label>
            <input
              type="text"
              required
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="form-control"
              id="Question"
              aria-required="true"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="Email"
              aria-required="true"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="Password"
              aria-required="true"
            />
          </div>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Submit"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
