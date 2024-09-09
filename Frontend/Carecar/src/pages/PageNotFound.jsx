import { Link } from "react-router-dom";
import Logo2 from "../assets/pnf.gif";

const PageNotFound = () => {
  return (
    <div
      style={{
        position: "relative", // Make the container a positioned element
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#f0f0f0",
        overflow: "hidden" // Ensure no overflow of the image
      }}
    >
      <img
        src={Logo2}
        alt="Page Not Found"
        style={{ width: "100vw", height: "100vh", objectFit: "cover" }}
      />
      <Link
        to="/"
        style={{
          position: "absolute", // Position the button absolutely
          bottom: "20px", // Adjust the position from the bottom
          left: "50%", // Center the button horizontally
          transform: "translateX(-50%)", // Center the button horizontally
          padding: "10px 20px",
          backgroundColor: "#fff",
          color: "#000",
          border: "2px solid #000",
          borderRadius: "5px",
          textDecoration: "none",
          fontSize: "16px",
          fontWeight: "bold"
        }}
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default PageNotFound;
