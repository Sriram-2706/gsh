import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        console.log("Fetching specialties...");
        const response = await axios.get("/specialties");
        console.log("Specialties fetched:", response.data);
        setData(response.data);
      } catch (err) {
        console.error("Error fetching specialties:", err);
        console.error("Status:", err.response?.status);
        console.error("Data:", err.response?.data);
        setError(err.response?.data?.message || "Failed to fetch specialties");
      }
    };

    fetchSpecialties();
  }, []);

  return (
    <>
      <Navbar />

      <h2 style={{ textAlign: "center" }}>Specialties</h2>

      {error && <div style={{ color: "red", textAlign: "center" }}>{error}</div>}

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        {data.map(x => (
          <div
            key={x.id}
            style={{ border: "1px solid gray", padding: "10px", cursor: "pointer" }}
            onClick={() => navigate(`/doctors/${x.id}`)}
          >
            {x.name}
          </div>
        ))}
      </div>
    </>
  );
}