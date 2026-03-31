import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { Card, CardContent, Typography, Button, Box, Chip, ToggleButton, ToggleButtonGroup } from "@mui/material";

export default function Doctors() {
  const { id } = useParams();
  const [doctors, setDoctors] = useState([]);
  const [specialtyName, setSpecialtyName] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const specRes = await axios.get(`/specialties/${id}`);
        setSpecialtyName(specRes.data.name);
        
        // Use query param approach from req.txt
        let url = `/doctors?specialty=${id}`;
        if (mode) {
          url += `&mode=${mode}`;
        }
        const docRes = await axios.get(url);
        setDoctors(docRes.data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Failed to fetch doctors");
      }
    };
    fetchData();
  }, [id, mode]);

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "10px", fontWeight: "bold" }}>
          Doctors - {specialtyName}
        </Typography>
        
        <Box sx={{ marginBottom: "20px" }}>
          <Typography variant="subtitle1" sx={{ marginBottom: "10px" }}>
            Filter by consultation mode:
          </Typography>
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(event, newMode) => setMode(newMode)}
            aria-label="consultation mode"
          >
            <ToggleButton value={null}>All</ToggleButton>
            <ToggleButton value="ONLINE">Online</ToggleButton>
            <ToggleButton value="OFFLINE">Offline</ToggleButton>
          </ToggleButtonGroup>
        </Box>

        {error && <Typography color="error" sx={{ marginBottom: "20px" }}>{error}</Typography>}
        
        {doctors.length === 0 ? (
          <Typography>No doctors available</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {doctors.map(d => (
              <Card key={d.id} sx={{ cursor: "pointer", "&:hover": { boxShadow: 3 } }}>
                <CardContent>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>{d.name}</Typography>
                  <Typography color="textSecondary" sx={{ marginBottom: "10px" }}>{specialtyName}</Typography>
                  <Box sx={{ marginBottom: "10px" }}>
                    <Chip label={d.mode} color={d.mode === "ONLINE" ? "primary" : "secondary"} sx={{ marginRight: "5px" }} />
                  </Box>
                  <Typography variant="body2" sx={{ marginBottom: "5px" }}><strong>Experience:</strong> {d.experience} years</Typography>
                  <Typography variant="body2" sx={{ marginBottom: "15px" }}><strong>Consultation Fee:</strong> ₹{d.consultationFee}</Typography>
                  <Button fullWidth variant="contained" onClick={() => navigate(`/slots/${d.id}`)}>View Slots</Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}