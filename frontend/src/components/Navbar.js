import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ background: "#1976d2" }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          GSH Hospital
        </Typography>

        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>

        {isAuthenticated ? (
          <>
            <Button color="inherit" onClick={() => navigate("/dashboard")}>Dashboard</Button>
            <Button color="inherit" onClick={() => navigate("/appointments")}>Appointments</Button>
            {user && (
              <Typography variant="body2" sx={{ marginLeft: "10px", marginRight: "10px", opacity: 0.9 }}>
                Hi, {user.name}
              </Typography>
            )}
            <Button color="inherit" onClick={handleLogout} sx={{ fontWeight: "bold" }}>
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" onClick={() => navigate("/register")}>Register</Button>
            <Button color="inherit" onClick={() => navigate("/login")}>Login</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}