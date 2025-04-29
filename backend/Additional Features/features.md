## **🔎 Features Implemented**
✅ **User Authentication** (Register/Login with JWT)  
✅ **Budget Tracking** (Set monthly budgets, update budgets)  
✅ **Expense Management** (Add, update, delete expenses)  
✅ **AI-Powered Financial Advice** (Google Gemini for AI insights)  
✅ **Goal Tracking** (Set, update, delete financial goals)  
✅ **Spending Trends Visualization** (Month-wise and category-wise trends)  
✅ **Monthly Financial Summary API**  

---

## **🚀 Features Still Needed**
Here are some **additional features** that will make BudgetMentor even better:  

### **1️⃣ Recurring Expenses**  
📌 **Problem**: Users might have expenses like rent, subscriptions, and utility bills that repeat every month.  
💡 **Solution**:  
- Add a `recurring` field in the **Expense model**  
- Allow users to set expenses that repeat every month  
- Auto-add these expenses at the start of each month  

### **2️⃣ Notifications & Reminders**  
📌 **Problem**: Users might forget to log expenses or miss their financial goals.  
💡 **Solution**:  
- Implement **email reminders** (e.g., "You’ve exceeded 80% of your budget!")  
- Use **Node.js + Cron Jobs** to schedule daily/weekly reminders  

### **3️⃣ Budget Recommendations Based on Trends**  
📌 **Problem**: Users might not know how to adjust their budgets based on past spending.  
💡 **Solution**:  
- AI can suggest **category-wise budget changes**  
- Example: *"You overspent on food last month. Consider reducing your dining-out budget by ₹2,000."*  

### **4️⃣ Multi-Currency Support**  
📌 **Problem**: Users from different countries may want to track expenses in their local currency.  
💡 **Solution**:  
- Allow users to set their preferred currency  
- Use a currency conversion API to show values in different currencies  

### **5️⃣ Bank API Integration (Future Enhancement)**  
📌 **Problem**: Manual expense entry can be tedious.  
💡 **Solution**:  
- Connect with **Plaid API / RazorpayX / SaltPay** to fetch transactions directly from bank accounts  
- Auto-categorize transactions  

---