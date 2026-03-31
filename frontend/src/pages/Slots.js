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
        const slotsRes = await axios.get(`/slots/doctor/${id}/available`);
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
          Available Slots - Dr. {doctorName}
        </Typography>
        {error && <Typography color="error" sx={{ marginBottom: "20px" }}>{error}</Typography>}
        {slots.length === 0 ? (
          <Typography>No available slots</Typography>
        ) : (
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: "15px" }}>
            {slots.map(s => (
              <Card key={s.id}>
                <CardContent>
                  <Typography variant="body1" sx={{ marginBottom: "10px" }}><strong>Start Time:</strong> {formatTime(s.startTime)}</Typography>
                  <Typography variant="body2" sx={{ marginBottom: "15px", color: "textSecondary" }}><strong>End Time:</strong> {formatTime(s.endTime)}</Typography>
                  <Chip label={s.booked ? "Booked" : "Available"} color={s.booked ? "error" : "success"} sx={{ marginBottom: "15px" }} />
                  <Button fullWidth variant="contained" disabled={s.booked} onClick={() => navigate(`/booking/${id}/${s.id}`)}>
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