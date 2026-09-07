import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { authAPi } from "./api/auth";

import Home from "./pages/Home";
import Calendar from "./pages/Callendar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    setLoading(true);
    try {
      const user = await authAPi.getUser();
      setUser(user);
    } catch (err) {
      const errRes = await err.response;
      console.log(errRes.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route element={<ProtectedRoute user={user} loading={loading} />}>
          <Route path="/" element={<Home />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
