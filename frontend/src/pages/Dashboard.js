import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated, loading: authLoading } = useAuth();

  useEffect(() => {
    // Redirect to login if not authenticated (wait for auth check to finish)
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
      return;
    }

    if (!authLoading && isAuthenticated) {
      const fetchSpecialties = async () => {
        try {
          const response = await axios.get("/specialties");
          setData(response.data);
        } catch (err) {
          console.error("Error fetching specialties:", err);
          setError(err.response?.data?.message || "Failed to fetch specialties");
        }
      };

      fetchSpecialties();
    }
  }, [authLoading, isAuthenticated, navigate]);

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