import { useState } from "react";
import { addBudget } from "../utils/api";
import { useSession } from "next-auth/react";

const AddBudget = ({ onBudgetAdded }) => {
  const { data: session } = useSession();
  const [budgetData, setBudgetData] = useState({ title: "", totalBudget: "", startDate: "", endDate: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (new Date(budgetData.endDate) <= new Date(budgetData.startDate)) {
      alert("End date must be after the start date.");
      return;
    }
    try {
      await addBudget(budgetData, session.accessToken);
      setBudgetData({ title: "", totalBudget: "", startDate: "", endDate: "" }); // Clear form
      onBudgetAdded();
    } catch (err) {
      alert("Failed to add budget: " + err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border p-4 mt-4">
      <input type="text" placeholder="Title" onChange={(e) => setBudgetData({ ...budgetData, title: e.target.value })} required className="border p-2 w-full mb-2" />
      <input type="number" placeholder="Total Budget" onChange={(e) => setBudgetData({ ...budgetData, totalBudget: e.target.value })} required className="border p-2 w-full mb-2" />
      <input type="date" onChange={(e) => setBudgetData({ ...budgetData, startDate: e.target.value })} required className="border p-2 w-full mb-2" />
      <input type="date" onChange={(e) => setBudgetData({ ...budgetData, endDate: e.target.value })} required className="border p-2 w-full mb-2" />
      <button type="submit" className="bg-green-500 text-white p-2 w-full">Add Budget</button>
    </form>
  );
};

export default AddBudget;
