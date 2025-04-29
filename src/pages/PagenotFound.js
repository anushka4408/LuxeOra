import React from "react";
import Layout from "../components/Layout/Layout";
import { Link } from "react-router-dom";
import "../style/pagenotfound.css";
const PagenotFound = () => {
  return (
    <Layout>
      <div className="pagenotf">
        <h1 className="pnfheading">404</h1>
        <h4 className="pnftext">Oops! Page Not Found</h4>
        <p className="text-center mt-3">
          <Link className="pnfbutton" to="/">
            GO BACK
          </Link>
        </p>
      </div>
    </Layout>
  );
};

export default PagenotFound;
