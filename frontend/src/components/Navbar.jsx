import { useNavigate, NavLink } from "react-router-dom";
import { authAPi } from "../api/auth";

function Navbar({ setUser }) {
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const success = await authAPi.logout();
      if (success) {
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <header className="flex flex-col justify-between w-[150px] border-r border-gray-200">
      <div>
        <div className="border-b border-gray-200">
          <div className="p-[8px] text-center">MyTodo</div>
        </div>
        <nav>
          <div>
            <NavLink to="/">Todo</NavLink>
          </div>
          <div>
            <NavLink to="/calendar">Calendar</NavLink>
          </div>
        </nav>
      </div>

      <div>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Navbar;
