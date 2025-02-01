import { useSession } from "next-auth/react"
import { useState, useEffect } from "react"
import { getBudgets } from "../utils/api"

const Dashboard = () => {
  const { data: session, status } = useSession()
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (session?.accessToken) {
      setLoading(true)
      setError(null)
      getBudgets(session.accessToken)
        .then((response) => {
          setBudgets(response.data) 
          setLoading(false)
        })
        .catch((error) => {
          console.error("Error fetching budgets:", error)
          setError(error.message || "Failed to fetch budgets")
          setLoading(false)
        })
    }
  }, [session])

  if (status === "loading") {
    return <p>Loading session...</p>
  }

  if (!session) {
    return <p>Please sign in to view your dashboard.</p>
  }

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
          {error}
        </div>
      )}
      {loading ? (
        <p>Loading budgets...</p>
      ) : budgets.length > 0 ? (
        budgets.map((budget) => (
          <div key={budget._id} className="border p-4 mt-4">
            <h2 className="text-lg font-semibold">{budget.title}</h2>
            <p>Total Budget: ${budget.totalBudget}</p>
            <p>Start Date: {new Date(budget.startDate).toDateString()}</p>
            <p>End Date: {new Date(budget.endDate).toDateString()}</p>
          </div>
        ))
      ) : (
        <p>No budgets found.</p>
      )}
    </div>
  )
}

export default Dashboard