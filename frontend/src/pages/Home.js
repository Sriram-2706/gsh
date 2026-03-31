import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <AppBar position="static" style={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          GSH Hospital
        </Typography>

        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
        <Button color="inherit" onClick={() => navigate("/dashboard")}>Booking</Button>
        <Button color="inherit" onClick={() => navigate("/profile")}>Profile</Button>
        <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
      </Toolbar>
    </AppBar>
  );
}