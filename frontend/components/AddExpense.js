import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { addExpense } from '../utils/api';

const AddExpense = ({ budgetId, onExpenseAdded }) => {
  const { data: session } = useSession();
  const [expenseData, setExpenseData] = useState({
    description: '',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    budgetId: budgetId
  });
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (expenseData.amount <= 0) {
      setError("Amount must be greater than 0.");
      return;
    }
    setError(null);
    try {
      await addExpense(expenseData, session.accessToken);
      setExpenseData({
        ...expenseData,
        description: "",
        amount: "",
      });
      alert("Expense added successfully!");
      if (onExpenseAdded) onExpenseAdded();
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Add New Expense</h3>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Description"
            value={expenseData.description}
            onChange={(e) => setExpenseData({ ...expenseData, description: e.target.value })}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            placeholder="Amount"
            value={expenseData.amount}
            onChange={(e) => setExpenseData({ ...expenseData, amount: e.target.value })}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="date"
            value={expenseData.date}
            onChange={(e) => setExpenseData({ ...expenseData, date: e.target.value })}
            required
            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Expense
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddExpense;