import { useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const login = async (e) => {
    e.preventDefault();
    try {
    } catch (err) {
      console.log(err);
    }
    console.log(form);
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

        <button
          type="submit"
          className="bg-blue-500 text-white px-[16px] py-[8px] rounded-sm w-full"
        >
          Register
        </button>
      </form>
      <p className="text-center">
        Already have an account? Try <NavLink to="/login">Login</NavLink>
      </p>
    </div>
  );
}

export default Register;
