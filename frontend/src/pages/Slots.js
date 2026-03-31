import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Slots() {
  const { id } = useParams();
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/slots/${id}`).then(res => setSlots(res.data));
  }, [id]);

  return (
    <div>
      <h2>Slots</h2>

      {slots.map(s => (
        <button
          key={s.id}
          disabled={s.booked}
          style={{ background: s.booked ? "gray" : "green" }}
          onClick={() => navigate(`/booking/${id}/${s.id}`)}
        >
          {s.startTime}
        </button>
      ))}
    </div>
  );
}