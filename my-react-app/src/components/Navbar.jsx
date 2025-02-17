import React from "react";
import theme from "../theme";
import logo from "../assets/logo.png";
import { useAuth } from "../AuthContext"; // Import authentication context

function Navbar() {
  const { currentUser, userRole } = useAuth(); // Get user info

  return (
    <nav style={{
      backgroundColor: theme.colors.primary,
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      position: "relative",
    }}>
      {/* Top Row: Logo & Title Centered */}
      <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "15px" }}> 
        {/* 👆 Added marginBottom to push text downward */}
        <img src={logo} alt="Logo" style={{ height: "50px" }} />
        <h1 style={{ color: theme.colors.text, fontFamily: theme.fonts.primary, margin: 0 }}>
          Dosis Obat Medis
        </h1>
      </div>

      {/* 👇 Move Welcome Text Slightly Down with Padding */}
      {currentUser && (
        <p style={{
          position: "absolute",
          bottom: "10px",  // Move slightly lower
          right: "20px",
          fontSize: "16px",
          fontWeight: "bold",
          color: theme.colors.text,
          paddingTop: "10px", // Add extra space from the title
        }}>
          Selamat datang, {currentUser.email} | {userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "Loading..."}
        </p>
      )}
    </nav>
  );
}

export default Navbar;
