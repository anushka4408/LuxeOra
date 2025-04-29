import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import "../../style/register.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  //form default behavior
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        setAuth({
          ...auth,
          user: res.data.user,
          token: res.data.token,
        });
        localStorage.setItem("auth", JSON.stringify(res.data));
        navigate(location.state || "/");
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("SOMETHING WENT WRONG");
    }
  };
  return (
    <Layout title="LOGIN">
      <div className="register">
        <h1>LOGIN</h1>
        <form onSubmit={handleSubmit}>
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
            />
          </div>
          <div className="mb-3">
            <label htmlFor="Password1" className="form-label">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="Password"
            />
          </div>
          <Link to="/forgotpass">Forgot password</Link>
          <br />
          <br />

          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
