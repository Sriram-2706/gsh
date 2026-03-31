import { useState } from "react";
import Navbar from "../components/Navbar";
import { TextField, Button, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async () => {
    setError("");
    
    // Validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("/auth/login", { email, password });
      const token = response.data;
      
      // Use AuthContext login — stores token, sets header, fetches user, updates state
      await login(token);
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          textAlign: "center",
          marginTop: "50px",
          maxWidth: "400px",
          margin: "50px auto",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "30px", fontWeight: "bold" }}>
          Login
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: "15px" }}>{error}</Alert>}

        <TextField
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          margin="normal"
          placeholder="Enter your email"
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyPress={handleKeyPress}
          margin="normal"
          placeholder="Enter your password"
        />

        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          disabled={loading}
          sx={{ marginTop: "20px", padding: "10px" }}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>

        <Typography variant="body2" sx={{ marginTop: "15px" }}>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
          >
            Register here
          </span>
        </Typography>
      </Box>
    </>
  );
}