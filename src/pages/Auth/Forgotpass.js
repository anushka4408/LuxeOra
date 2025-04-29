import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../style/register.css";

const Forgotpass = () => {
  const [question, setQuestion] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const validateInputs = () => {
    if (!email || !question || !newPassword) {
      toast.error("All fields are required.");
      return false;
    }
    // Check email format
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    // Password complexity check
    if (
      !/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/.test(
        newPassword
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

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/forgot-password`,
        {
          email,
          question,
          newPassword,
        }
      );

      if (res && res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      toast.error(errorMessage);
    }
  };

  return (
    <Layout title="Password Reset">
      <div className="register">
        <h1>RESET PASSWORD</h1>
        <form onSubmit={handleSubmit} aria-labelledby="reset-password-form">
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
            <label htmlFor="Password" className="form-label">
              New Password
            </label>
            <input
              type="password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-control"
              id="Password"
              aria-required="true"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Reset
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Forgotpass;
