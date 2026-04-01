import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { Box, Typography, Button, Card, CardContent, Chip } from "@mui/material";

export default function Slots() {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const [doctorName, setDoctorName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRes = await axios.get(`/doctors/${id}`);
        setDoctorName(docRes.data.name);
        // Fetch ALL slots (including booked) to show booked ones greyed out
        const slotsRes = await axios.get(`/slots/doctor/${id}/all`);
        setSlots(slotsRes.data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Failed to fetch slots");
      }
    };
    fetchData();
  }, [id]);

  const formatTime = (datetime) => {
    if (!datetime) return "N/A";
    try {
      const date = new Date(datetime);
      return date.toLocaleString("en-IN", { weekday: "short", year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
    } catch (e) {
      return datetime;
    }
  };

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Slots - Dr. {doctorName}
        </Typography>
        {error && <Typography color="error" sx={{ marginBottom: "20px" }}>{error}</Typography>}
        {slots.length === 0 ? (
          <Typography>No slots available</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
            {slots.map(s => (
              <Card
                key={s.id}
                sx={{
                  opacity: s.booked ? 0.5 : 1,
                  backgroundColor: s.booked ? "#f5f5f5" : "#fff",
                  border: s.booked ? "1px solid #ddd" : "1px solid #1976d2",
                }}
              >
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: "10px" }}>
                    <strong>Start:</strong> {formatTime(s.startTime)}
                  </Typography>
                  <Typography variant="body2" sx={{ marginBottom: "15px", color: "textSecondary" }}>
                    <strong>End:</strong> {formatTime(s.endTime)}
                  </Typography>
                  <Chip
                    label={s.booked ? "Booked" : "Available"}
                    color={s.booked ? "default" : "success"}
                    sx={{ marginBottom: "15px" }}
                  />
                  <Button
                    fullWidth
                    variant={s.booked ? "outlined" : "contained"}
                    disabled={s.booked}
                    onClick={() => navigate(`/booking/${id}/${s.id}`)}
                    sx={{
                      ...(s.booked && {
                        color: "#bbb",
                        borderColor: "#ddd",
                      })
                    }}
                  >
                    {s.booked ? "Not Available" : "Book Now"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </>
  );
}