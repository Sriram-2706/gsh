import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Typography, Box, FormControl, InputLabel, Select, MenuItem,
  CircularProgress, Alert
} from "@mui/material";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!authLoading && isAuthenticated) {
      const fetchSpecialties = async () => {
        try {
          const response = await axios.get("/specialties");
          setData(response.data);
        } catch (err) {
          console.error("Error fetching specialties:", err);
          setError(err.response?.data?.message || "Failed to fetch specialties");
        } finally {
          setLoading(false);
        }
      };

      fetchSpecialties();
    }
  }, [authLoading, isAuthenticated, navigate]);

  const handleSpecialtyChange = (event) => {
    const specialtyId = event.target.value;
    setSelectedSpecialty(specialtyId);
    if (specialtyId) {
      navigate(`/doctors/${specialtyId}`);
    }
  };

  if (authLoading || loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ textAlign: "center", marginTop: "60px" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <Box sx={{ padding: "30px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "10px", fontWeight: "bold" }}>
          Book an Appointment
        </Typography>
        <Typography variant="body1" sx={{ textAlign: "center", marginBottom: "30px", color: "text.secondary" }}>
          Select a specialty to find available doctors
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: "20px" }}>{error}</Alert>}

        <FormControl fullWidth>
          <InputLabel id="specialty-label">Choose a Specialty</InputLabel>
          <Select
            labelId="specialty-label"
            value={selectedSpecialty}
            label="Choose a Specialty"
            onChange={handleSpecialtyChange}
          >
            {data.map(x => (
              <MenuItem key={x.id} value={x.id}>
                {x.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  );
}