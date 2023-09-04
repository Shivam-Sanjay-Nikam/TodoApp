import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS
const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(email, password);
  };

  return (
    <form className="signup max-w-md mx-auto mt-8" onSubmit={handleSubmit}>
      <h3 className="text-2xl font-semibold mb-4">Sign Up</h3>

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
        className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white py-2 rounded"
        type="submit"
        disabled={isLoading}
      >
        {isLoading ? "Signing up..." : "Sign up"}
      </button>

      {error && (
        <div className="text-red-500 mt-2">{error}</div>
      )}
    </form>
  );
};

export default Signup;
