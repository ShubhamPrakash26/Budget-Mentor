import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Welcome to BudgetMentor</h1>
      <Link href="/auth">
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Get Started</button>
      </Link>
    </div>
  );
}
