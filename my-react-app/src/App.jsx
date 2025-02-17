import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Container from "./components/Container";
import DrugsList from "./DrugsList";
import AdminDashboard from "./AdminDashboard";
import LoginPage from "./LoginPage";
import { useAuth, AuthProvider } from "./AuthContext";

function AppContent() {
  const { currentUser, logout } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);

  if (!currentUser) {
    return <LoginPage />;
  }

  return (
    <Container>
      <Navbar />
      <button onClick={() => setIsAdmin(!isAdmin)}>
        {isAdmin ? "View Drug List" : "Go to Admin Panel"}
      </button>
      <button onClick={logout} style={{ marginLeft: "10px", backgroundColor: "red", color: "white" }}>Logout</button>
      {isAdmin ? <AdminDashboard /> : <DrugsList />}
    </Container>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );  // ✅ Ensure return has a valid component inside (no misplaced semicolon)
}

export default App;
