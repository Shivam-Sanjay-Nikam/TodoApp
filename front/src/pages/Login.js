import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
  };

  return (
    <form className="login max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold mb-4">Log In</h3>

      <label className="block mb-2">Email address:</label>
      <input
        type="email"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        required
      />

      <label className="block mt-4 mb-2">Password:</label>
      <input
        type="password"
        className="w-full p-2 border border-gray-300 rounded"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        required
      />

      <button
        className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Logging in..." : "Log in"}
      </button>
      
      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </form>
  );
};

export default Login;
