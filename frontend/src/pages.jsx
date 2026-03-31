import Navbar from "../components/Navbar";
import { Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Typography variant="h4">Welcome to GSH Hospital</Typography>

        <Button 
          variant="contained" 
          style={{ marginTop: "20px" }} 
          onClick={() => navigate("/dashboard")}
        >
          Book Appointment
        </Button>
      </div>
    </>
  );
}

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
    } catch (e) {
      alert("Error");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <TextField label="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <TextField label="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </div>
    </>
  );
}

import { useEffect, useState } from "react";
import axios from "../api/axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/specialties").then(res => setData(res.data));
  }, []);

  return (
    <>
      <Navbar />
      <h2 style={{ textAlign: "center" }}>Specialties</h2>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        {data.map(x => (
          <div 
            key={x.id} 
            style={{ border: "1px solid gray", padding: "10px" }}
            onClick={() => navigate(`/doctors/${x.id}`)}
          >
            {x.name}
          </div>
        ))}
      </div>
    </>
  );
}

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Doctors() {
  const { id } = useParams();
  const [mode, setMode] = useState("ONLINE");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/doctors?specialty=${id}&mode=${mode}`)
      .then(res => setDoctors(res.data));
  }, [mode, id]);

  return (
    <div>
      <h2>Doctors</h2>

      <button onClick={() => setMode("ONLINE")}>Online</button>
      <button onClick={() => setMode("OFFLINE")}>Offline</button>

      {doctors.map(d => (
        <div key={d.id} onClick={() => navigate(`/slots/${d.id}`)}>
          {d.name}
        </div>
      ))}
    </div>
  );
}