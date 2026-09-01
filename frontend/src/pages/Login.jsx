import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { authAPi } from "../api/auth";

function Login({ setUser }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const user = await authAPi.login(form);
      setUser(user);
      navigate("/");
    } catch (err) {
      const errRes = await err.response;
      const errMsg = errRes.data.message;
      setError(errMsg);
      console.log(errMsg);
    }
  };

  return (
    <div className="min-h-screen grid place-content-center">
      <form
        onSubmit={login}
        className="border border-gray-300 rounded-sm px-[32px] py-[24px]"
      >
        <div className="flex justify-between items-center">
          <label htmlFor="email">Email</label>
          <input
            className="border border-gray-300 rounded-sm px-[8px] py-[4px]"
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
            required
            autoFocus
          />
        </div>
        <div className="my-[16px]">
          <label htmlFor="password">Password</label>
          <input
            className="border border-gray-300 rounded-sm px-[8px] py-[4px] ml-[16px]"
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                password: e.target.value,
              }))
            }
            required
          />
        </div>
        {error && <p className="text-red-500 mb-[8px]">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-[16px] py-[8px] rounded-sm w-full mb-[8px]"
        >
          Login
        </button>
        <p className="text-center">
          Don't have an account? Try{" "}
          <NavLink to="/register" className={"text-blue-500"}>
            Register
          </NavLink>
        </p>
      </form>
    </div>
  );
}

export default Login;
