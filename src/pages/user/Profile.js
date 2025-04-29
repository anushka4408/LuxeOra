import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import toast from "react-hot-toast";

const Profile = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);

  //GET USER DATA
  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone, address } = auth.user;
      setName(name);
      setAddress(address);
      setEmail(email);
      setPhone(phone);
    }
  }, [auth?.user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        {
          name,
          email,
          address,
          phone,
          password,
        }
      );

      if (data.success) {
        setAuth({ ...auth, user: data.updateduser });
        let ls = localStorage.getItem("auth");
        if (ls) {
          ls = JSON.parse(ls);
          ls.user = data.updateduser;
          localStorage.setItem("auth", JSON.stringify(ls));
        }
        toast.success("PROFILE UPDATED SUCCESSFULLY");
      } else {
        toast.error(data.error);
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
    <Layout title={"Dashboard-Profile"}>
      <div className="container-fluid p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="register">
              <h1>UPDATE PROFILE</h1>
              <form onSubmit={handleSubmit} aria-labelledby="register-form">
                <div className="mb-3">
                  <label htmlFor="Name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="form-control"
                    id="Name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Phone" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="form-control"
                    id="Phone"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="form-control"
                    id="Address"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="Email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control"
                    id="Email"
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="Password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    id="Password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
