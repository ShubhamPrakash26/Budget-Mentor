import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { getExpenses } from '../utils/api';

const ExpenseList = ({ budgetId }) => {
  const { data: session } = useSession();
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (session?.accessToken && budgetId) {
        try {
          const response = await getExpenses(budgetId, session.accessToken);
          setExpenses(response.data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchExpenses();
  }, [session, budgetId]);

  if (loading) return <div className="text-center py-4">Loading expenses...</div>;
  if (error) return <div className="text-red-500 py-4">Error: {error}</div>;
  if (!expenses.length) return <div className="text-center py-4">No expenses found.</div>;

  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-4">Expenses</h3>
      <div className="space-y-2">
        {expenses.map((expense) => (
          <div key={expense._id} className="bg-white p-4 rounded-lg shadow border">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">{expense.description}</h4>
                <p className="text-sm text-gray-500">
                  {new Date(expense.date).toLocaleDateString()}
                </p>
              </div>
              <div className="text-lg font-semibold text-red-500">
                ${expense.amount.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;