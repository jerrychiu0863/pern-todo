import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoute({ user, loading }) {
  if (loading) {
    return <div>Loading</div>;
  }

  return user ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

export default ProtectedRoute;
