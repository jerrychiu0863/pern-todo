import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoute({ user, loading }) {
  if (loading) {
    return <div>Loading</div>;
  }

  return user ? (
    <div className="flex h-screen">
      <Navbar />
      <div className="flex-1 p-[16px]">
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
