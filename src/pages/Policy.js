import React from "react";
import Layout from "../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - LuxeOra"}>
      <div style={styles.container}>
        <h1>Privacy Policy</h1>

        <p>
          At <b>LuxeOra</b> we are committed to safeguarding your privacy and
          ensuring the security of your personal information. This Privacy
          Policy outlines how we collect, use, and protect the data you provide
          when using our website.
        </p>

        <h2>Information We Collect</h2>
        <p>
          We may collect personal information such as your name, email address,
          phone number, shipping address, and payment details when you create an
          account, make a purchase, or contact us. This information is essential
          for fulfilling your orders and providing you with the best possible
          shopping experience.
        </p>

        <h2>How We Use Your Information</h2>
        <ul>
          <li>
            <strong>Order Processing:</strong> We use your information to
            process your orders and provide customer support.
          </li>
          <li>
            <strong>Personalized Experience:</strong> We may use your data to
            personalize your shopping experience, offer relevant products, and
            improve our services.
          </li>
          <li>
            <strong>Communication:</strong> We may contact you via email or
            phone to notify you about order updates, promotions, and special
            offers.
          </li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement advanced security measures to protect your personal
          information and ensure that it is safe from unauthorized access. We
          use encryption and other secure methods to protect sensitive data such
          as payment details.
        </p>

        <h2>Your Rights</h2>
        <p>
          You have the right to access, correct, or delete your personal
          information at any time. If you have any concerns regarding your data,
          please contact us at support@luxora.com.
        </p>
      </div>
    </Layout>
  );
};

const styles = {
  container: {
    padding: "20px",
    textAlign: "left",
    maxWidth: "800px",
    margin: "0 auto",
  },
};

export default Policy;
