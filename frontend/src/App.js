import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "./api/axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Slots from "./pages/Slots";
import Booking from "./pages/Booking";
import Appointments from "./pages/Appointments";

function App() {
  useEffect(() => {
    // Initialize token from localStorage on app startup
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors/:id" element={<Doctors />} />
        <Route path="/slots/:id" element={<Slots />} />
        <Route path="/booking/:doctorId/:slotId" element={<Booking />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;