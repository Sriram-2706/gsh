import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

export default function Slots() {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/slots/${id}`)
      .then(res => setSlots(res.data));
  }, [id]);

  return (
    <>
      <Navbar />

      <h2>Slots</h2>

      {slots.map(s => (
        <button
          key={s.id}
          disabled={s.booked}
          style={{
            background: s.booked ? "gray" : "green",
            color: "white",
            margin: "5px"
          }}
          onClick={() => navigate(`/booking/${id}/${s.id}`)}
        >
          {s.startTime}
        </button>
      ))}
    </>
  );
}