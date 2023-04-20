import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <>
      <div className="navbar fixed-bottom justify-content-center">
        <span
          style={{
            background: "#1f1e1e",
            paddingLeft: "0px",
            paddingRight: "0px",
            paddingTop: "0px",
            paddingBottom: "0px",
            color: "gray",
            borderRadius: "5px",
            fontSize: "15px",
            width: "250px",
            textAlign: "center",
          }}
        >
          Developed by
          <br />
          <span style={{ color: "red" }}>
            {" "}
            Abhishek, Pratik, Rajiv, Navneet{" "}
          </span>{" "}
        </span>{" "}
      </div>{" "}
    </>
  );
};
export default Footer;
