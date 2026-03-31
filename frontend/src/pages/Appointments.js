import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

export default function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/appointments/user/1")
      .then(res => setData(res.data));
  }, []);

  return (
    <>
      <Navbar />

      <h2>My Appointments</h2>

      {data.map(a => (
        <div key={a.id}>
          {a.status}
        </div>
      ))}
    </>
  );
}