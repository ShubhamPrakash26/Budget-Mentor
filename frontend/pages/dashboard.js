import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { getBudgets } from "../utils/api";
import Layout from "../components/Layout";
import AddBudget from "../components/AddBudget";
import BudgetList from "../components/BudgetList";
import { useRouter } from "next/router";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBudgets = async () => {
      if (!session?.accessToken) {
        console.log("No access token available");
        return;
      }

      try {
        setLoading(true);
        setError(null);
        console.log("Fetching budgets with token:", session.accessToken);
        
        const response = await getBudgets(session.accessToken);
        console.log("Budgets response:", response);
        
        setBudgets(response.data);
      } catch (err) {
        console.error("Detailed error:", {
          message: err.message,
          response: err.response,
          request: err.request,
          config: err.config
        });
        
        setError(
          err.response?.data?.message || 
          err.message || 
          "Failed to fetch budgets"
        );
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchBudgets();
    } else if (status === "unauthenticated") {
      router.push("/auth");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <Layout>
        <div className="flex justify-center items-center min-h-screen">
          <div className="text-xl">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!session) {
    router.push("/auth");
    return null;
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Welcome, {session.user?.email}
          </div>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p className="font-bold">Error:</p>
            <p>{error}</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New Budget</h2>
            <AddBudget onBudgetAdded={() => fetchBudgets()} />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Budgets</h2>
            {loading ? (
              <div className="text-center py-4">Loading budgets...</div>
            ) : (
              <BudgetList budgets={budgets} />
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;