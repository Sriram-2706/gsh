import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

export default function Doctors() {
  const { id } = useParams();
  const [mode, setMode] = useState("ONLINE");
  const [doctors, setDoctors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/doctors?specialty=${id}&mode=${mode}`)
      .then(res => setDoctors(res.data));
  }, [id, mode]);

  return (
    <>
      <Navbar />

      <h2>Doctors</h2>

      <button onClick={() => setMode("ONLINE")}>Online</button>
      <button onClick={() => setMode("OFFLINE")}>Offline</button>

      {doctors.map(d => (
        <div key={d.id} onClick={() => navigate(`/slots/${d.id}`)}>
          {d.name}
        </div>
      ))}
    </>
  );
}