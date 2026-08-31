import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function ProtectedRoute() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default ProtectedRoute;
