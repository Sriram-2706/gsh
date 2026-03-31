import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Card, CardContent, Alert, CircularProgress, Chip } from "@mui/material";

export default function Appointments() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!authLoading && user) {
      axios.get(`/appointments/user/${user.id}`)
        .then(res => {
          setData(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Error fetching appointments:", err);
          setError(err.response?.data?.message || "Failed to fetch appointments");
          setLoading(false);
        });
    }
  }, [authLoading, isAuthenticated, user, navigate]);

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED": return "success";
      case "PENDING": return "warning";
      case "CANCELLED": return "error";
      case "COMPLETED": return "info";
      default: return "default";
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <Typography variant="h4" sx={{ textAlign: "center", marginBottom: "20px", fontWeight: "bold" }}>
          My Appointments
        </Typography>

        {error && <Alert severity="error" sx={{ marginBottom: "20px" }}>{error}</Alert>}

        {(loading || authLoading) && (
          <Box sx={{ textAlign: "center", marginTop: "40px" }}>
            <CircularProgress />
          </Box>
        )}

        {!loading && !authLoading && data.length === 0 && (
          <Typography sx={{ textAlign: "center", color: "gray", marginTop: "40px" }}>
            No appointments found. Book one from the Dashboard!
          </Typography>
        )}

        {data.map(a => (
          <Card key={a.id} sx={{ marginBottom: "15px" }}>
            <CardContent>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  {a.doctorName && (
                    <Typography variant="h6">Dr. {a.doctorName}</Typography>
                  )}
                  {a.specialtyName && (
                    <Typography variant="body2" color="text.secondary">{a.specialtyName}</Typography>
                  )}
                  {a.startTime && (
                    <Typography variant="body2" sx={{ marginTop: "5px" }}>
                      {new Date(a.startTime).toLocaleString("en-IN", {
                        weekday: "short", year: "numeric", month: "short",
                        day: "numeric", hour: "2-digit", minute: "2-digit"
                      })}
                    </Typography>
                  )}
                  {a.mode && (
                    <Typography variant="body2" color="text.secondary">Mode: {a.mode}</Typography>
                  )}
                </Box>
                <Chip label={a.status} color={getStatusColor(a.status)} />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </>
  );
}