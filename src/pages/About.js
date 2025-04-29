import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={"About Us - LuxeOra"}>
      <div style={styles.container}>
        <h1>About Us</h1>
        <p>
          Welcome to <b>LuxeOra</b>, your premier destination for the finest
          luxury products from around the world. We are dedicated to offering
          high-end accessories, clothing, handbags, and cosmetics for those who
          appreciate quality and sophistication.
        </p>

        <h2>Our Mission</h2>
        <p>
          At <b>LuxeOra</b>, our mission is simple: to provide an unparalleled
          shopping experience for fashion-forward individuals who demand nothing
          but the best. Every item in our collection is handpicked to ensure it
          meets our exacting standards of luxury, craftsmanship, and style.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>
            <strong>Exclusive Products:</strong> We bring you the best from top
            luxury brands, ensuring you stand out with each purchase.
          </li>
          <li>
            <strong>Premium Quality:</strong> Every item we offer is selected
            for its superior quality, craftsmanship, and timeless elegance.
          </li>
          <li>
            <strong>Personalized Service:</strong> Our team is dedicated to
            providing you with personalized shopping assistance to make your
            experience seamless and unforgettable.
          </li>
        </ul>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "center",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

export default About;
