import { useNavigate, NavLink } from "react-router-dom";
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
    <header className="bg-blue-300 p-[16px] flex flex-col justify-between w-[150px]">
      <div>
        MyTodo
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
