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