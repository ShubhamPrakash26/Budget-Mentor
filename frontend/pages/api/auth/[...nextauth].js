import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";


export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log("Credentials received:", credentials);
        try {
          const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
          console.log("Login response:", res.data);
          return res.data;
        } catch (error) {
          console.error("Login failed:", error.response?.data || error.message);
          throw new Error("Invalid credentials");
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.accessToken = user.token;
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
