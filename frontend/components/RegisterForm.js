import { useState } from "react";
import { register } from "../utils/api";
import { useRouter } from "next/router";

const RegisterForm = () => {
  const [userData, setUserData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await register(userData);
      router.push("/auth");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4">
      {error && <p className="text-red-500">{error}</p>}
      <input type="text" placeholder="Name" onChange={(e) => setUserData({ ...userData, name: e.target.value })} required className="border p-2 w-full mb-2" />
      <input type="email" placeholder="Email" onChange={(e) => setUserData({ ...userData, email: e.target.value })} required className="border p-2 w-full mb-2" />
      <input type="password" placeholder="Password" onChange={(e) => setUserData({ ...userData, password: e.target.value })} required className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Register</button>
    </form>
  );
};

export default RegisterForm;
