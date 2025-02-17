import React from "react";
import theme from "../theme";

function Container({ children }) {
  return (
    <div style={{
      backgroundColor: theme.colors.background,
      minHeight: "100vh",
      padding: "2rem",
      fontFamily: theme.fonts.primary,
    }}>
      {children}
    </div>
  );
}

export default Container;