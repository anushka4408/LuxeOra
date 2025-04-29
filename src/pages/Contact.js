import React from "react";
import Layout from "../components/Layout/Layout";

const Contact = () => {
  // Inline styles for elements
  const containerStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px",
    textAlign: "center",
  };

  const contactInfoStyle = {
    marginBottom: "20px",
    fontSize: "1.1em",
    lineHeight: "1.6",
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  };

  const formGroupStyle = {
    display: "flex",
    flexDirection: "column",
    textAlign: "left",
  };

  const labelStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
  };

  const inputStyle = {
    padding: "10px",
    fontSize: "1em",
    border: "1px solid #ddd",
    borderRadius: "4px",
  };

  const buttonStyle = {
    padding: "10px 15px",
    fontSize: "1em",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  return (
    <Layout>
      <div style={containerStyle}>
        <h1>Contact Us</h1>
        <p>
          We'd love to hear from you! Reach out to us for any queries or
          feedback.
        </p>

        <div style={contactInfoStyle}>
          <p>
            <strong>Email:</strong> support@yourcompany.com
          </p>
          <p>
            <strong>Phone:</strong> +1 (123) 456-7890
          </p>
          <p>
            <strong>Address:</strong> 123 Luxury Lane, Suite 456, Cityville,
            Country
          </p>
        </div>

        <form style={formStyle}>
          <div style={formGroupStyle}>
            <label htmlFor="name" style={labelStyle}>
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="email" style={labelStyle}>
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your Email"
              required
              style={inputStyle}
            />
          </div>
          <div style={formGroupStyle}>
            <label htmlFor="message" style={labelStyle}>
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              required
              style={{ ...inputStyle, resize: "none" }}
            ></textarea>
          </div>
          <button type="submit" style={buttonStyle}>
            Send Message
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Contact;
