import { useState } from "react";
import Navbar from "../components/Navbar";
import { TextField, Button } from "@mui/material";
import axios from "../api/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post("/auth/login", { email, password });
      alert("Login Successful");
    } catch {
      alert("Login Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} />
        <br /><br />
        <TextField
          label="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br /><br />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
}