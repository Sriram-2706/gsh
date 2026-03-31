import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "../api/axios";

export default function Booking() {
  const { doctorId, slotId } = useParams();
  const navigate = useNavigate();

  const book = async () => {
    await axios.post("/appointments/book", {
      doctorId,
      slotId,
      mode: "ONLINE"
    });

    alert("Booked!");
    navigate("/appointments");
  };

  return (
    <>
      <Navbar />

      <h2>Confirm Booking</h2>
      <button onClick={book}>Confirm</button>
    </>
  );
}