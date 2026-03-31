import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Appointments() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/appointments/user/1")
      .then(res => setData(res.data));
  }, []);

  return (
    <div>
      <h2>My Appointments</h2>

      {data.map(x => (
        <div key={x.id}>
          {x.status}
        </div>
      ))}
    </div>
  );
}