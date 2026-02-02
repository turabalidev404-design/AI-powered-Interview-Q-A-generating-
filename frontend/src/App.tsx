import React, { type JSX } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp.page";
import Login from "./pages/Login.page";
import RandomTest from "./pages/RandomTest.page";

// Simple auth check (replace with real logic as needed)
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route Component
const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/random" element={<RandomTest />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default App;
