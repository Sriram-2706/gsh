import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { Box, Typography, Card, CardContent, Button, Alert, CircularProgress } from "@mui/material";

export default function Booking() {
  const { doctorId, slotId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [doctor, setDoctor] = useState(null);
  const [slot, setSlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [booking, setBooking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const userRes = await axios.get("/users/me");
        setUser(userRes.data);

        const docRes = await axios.get(`/doctors/${doctorId}`);
        setDoctor(docRes.data);

        const slotRes = await axios.get(`/slots/by-id/${slotId}`);
        setSlot(slotRes.data);
      } catch (err) {
        console.error("Error:", err);
        setError(err.response?.data?.message || "Failed to load booking details");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [doctorId, slotId]);

  const formatDateTime = (datetime) => {
    if (!datetime) return "N/A";
    try {
      const date = new Date(datetime);
      return date.toLocaleString("en-IN", {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    } catch (e) {
      return datetime;
    }
  };

  const handleConfirmBooking = async () => {
    try {
      setBooking(true);
      setError("");

      if (!user || !doctor || !slot) {
        setError("Missing booking details");
        return;
      }

      const response = await axios.post("/appointments/book", {
        patientId: user.id,
        doctorId: parseInt(doctorId),
        slotId: parseInt(slotId),
        mode: doctor.mode
      });

      if (response.data) {
        navigate("/appointments", { state: { booked: true } });
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.message || "Failed to book appointment");
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <Box sx={{ padding: "20px", textAlign: "center" }}>
          <CircularProgress />
        </Box>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ marginBottom: "20px", fontWeight: "bold" }}>
          Confirm Booking
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: "20px" }}>{error}</Alert>}

        {user && doctor && slot && (
          <>
            <Card sx={{ marginBottom: "20px" }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                  Patient Information
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Name:</strong> {user.name}
                </Typography>
                <Typography sx={{ marginBottom: "15px" }}>
                  <strong>Email:</strong> {user.email}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                  Doctor Information
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Doctor:</strong> Dr. {doctor.name}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Specialty:</strong> {doctor.specialtyName}
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Mode:</strong> {doctor.mode}
                </Typography>
                <Typography sx={{ marginBottom: "15px" }}>
                  <strong>Consultation Fee:</strong> ₹{doctor.consultationFee}
                </Typography>

                <Typography variant="h6" sx={{ fontWeight: "bold", marginBottom: "15px" }}>
                  Appointment Slot
                </Typography>
                <Typography sx={{ marginBottom: "8px" }}>
                  <strong>Start Time:</strong> {formatDateTime(slot.startTime)}
                </Typography>
                <Typography sx={{ marginBottom: "15px" }}>
                  <strong>End Time:</strong> {formatDateTime(slot.endTime)}
                </Typography>

                <Box sx={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={booking}
                    onClick={handleConfirmBooking}
                  >
                    {booking ? "Booking..." : "Confirm Booking"}
                  </Button>
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={() => navigate(-1)}
                    disabled={booking}
                  >
                    Cancel
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </>
        )}
      </Box>
    </>
  );
}