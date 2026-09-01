import axios from "axios";
import { useNavigate } from "react-router-dom";
import { authAPi } from "../api/auth";

function Navbar() {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const success = await authAPi.logout();
      if (success) {
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="bg-blue-300 px-[8px] py-[8px] flex justify-between mb-[16px]">
      <div>MyTodo</div>
      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
