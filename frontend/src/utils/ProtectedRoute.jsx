import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoute({ user, loading, setUser }) {
  if (loading) {
    return <div>Loading</div>;
  }

  return user ? (
    <div className="flex h-screen">
      <Navbar setUser={setUser} />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
