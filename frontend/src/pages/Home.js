import Navbar from "../components/Navbar";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "60px" }}>
        <Typography variant="h4">Welcome to GSH Hospital</Typography>

        <Button
          variant="contained"
          sx={{ marginTop: "20px" }}
          onClick={() => navigate("/dashboard")}
        >
          Book Appointment
        </Button>
      </div>
    </>
  );
}