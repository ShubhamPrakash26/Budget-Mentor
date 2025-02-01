import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import Link from "next/link";

const Auth = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", { redirect: false, ...credentials });
    if (result.ok) router.push("/dashboard");
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setCredentials({ ...credentials, email: e.target.value })} required className="border p-2 w-full mb-2" />
          <input type="password" placeholder="Password" onChange={(e) => setCredentials({ ...credentials, password: e.target.value })} required className="border p-2 w-full mb-2" />
          <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
        </form>
      </div>
      <p className="mt-4 text-center">
        Don't have an account?{" "}
        <Link href="/register">
          <span className="text-blue-500 cursor-pointer">Register here</span>
        </Link>
      </p>
    </div>
    </>
  );
};

export default Auth;
