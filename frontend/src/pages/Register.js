import { useState } from "react";
import Navbar from "../components/Navbar";
import { TextField, Button, MenuItem, Box, Typography, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "../api/axios";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "PATIENT"
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError("");
  };

  const handleRegister = async () => {
    setError("");
    setSuccess("");

    // Validation
    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      await axios.post("/auth/register", formData);
      setSuccess("Registration successful! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response?.data || "Registration failed. Please try again.");
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
          Create Account
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: "15px" }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ marginBottom: "15px" }}>{success}</Alert>}

        <TextField
          fullWidth
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          margin="normal"
          placeholder="Enter your full name"
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          margin="normal"
          placeholder="Enter your email"
        />

        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          margin="normal"
          placeholder="Enter your password"
        />

        <TextField
          fullWidth
          label="Role"
          name="role"
          select
          value={formData.role}
          onChange={handleChange}
          margin="normal"
        >
          <MenuItem value="PATIENT">Patient</MenuItem>
          <MenuItem value="ADMIN">Admin</MenuItem>
        </TextField>

        <Button
          fullWidth
          variant="contained"
          onClick={handleRegister}
          sx={{ marginTop: "20px", padding: "10px" }}
        >
          Register
        </Button>

        <Typography variant="body2" sx={{ marginTop: "15px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#1976d2", cursor: "pointer", textDecoration: "underline" }}
          >
            Login here
          </span>
        </Typography>
      </Box>
    </>
  );
}
