# BudgetMentor

**BudgetMentor** is an AI-powered financial advisor platform designed to help users effectively manage their budgets, track expenses, and achieve financial goals. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and powered by OpenAI APIs, BudgetMentor provides personalized financial insights and advice to users in a user-friendly interface.

## Features

- **User Authentication**: Secure user registration and login with JWT-based authentication.
- **Budget Tracking**: Set monthly budgets and monitor spending in various categories.
- **Expense Management**: Add, view, and categorize expenses.
- **AI-Powered Financial Advice**: Receive personalized advice using OpenAI APIs.
- **Goal Tracking**: Set and track progress towards financial goals.
- **Spending Trends Visualization**: View spending habits and trends through interactive charts.

## Tech Stack

### Frontend
- **Next.js**: For building a dynamic and SEO-friendly user interface.
- **Axios**: For API communication between frontend and backend.
- **NextAuth.js**: For seamless authentication.

### Backend
- **Node.js**: Runtime environment for server-side execution.
- **Express.js**: For building RESTful APIs.
- **OpenAI API**: Provides AI-powered insights and recommendations.

### Database
- **MongoDB**: Stores user data, budgets, expenses, and goals.

### Additional Tools
- **Chart.js**: For data visualization.
- **TailwindCSS**: For designing a clean and responsive UI.

## Installation

### Prerequisites
- Node.js installed on your system.
- MongoDB installed locally or access to a cloud-based MongoDB instance (e.g., MongoDB Atlas).

### Steps

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-repo/budgetmentor.git
   cd budgetmentor
   ```

2. **Backend Setup**:
   ```bash
   cd backend
   npm install
   ```
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     OPENAI_API_KEY=your_openai_api_key
     ```
   - Start the server:
     ```bash
     npm run dev
     ```

3. **Frontend Setup**:
   ```bash
   cd ../frontend
   npx create-next-app@latest .
   npm install
   ```
   - Install necessary dependencies:
     ```bash
     npm install axios tailwindcss @tailwindcss/forms chart.js react-chartjs-2 next-auth
     ```
   - Initialize TailwindCSS:
     ```bash
     npx tailwindcss init
     ```
   - Configure `tailwind.config.js` to include the required paths:
     ```js
     module.exports = {
       content: [
         "./pages/**/*.{js,ts,jsx,tsx}",
         "./components/**/*.{js,ts,jsx,tsx}"
       ],
       theme: {
         extend: {},
       },
       plugins: [require('@tailwindcss/forms')],
     };
     ```
   - Start the development server:
     ```bash
     npm run dev
     ```

4. **Access the Application**:
   Open your browser and navigate to `http://localhost:3000`.

Here’s the updated **API Endpoints** section for your **README.md** file in markdown format:  

---

## **API Endpoints**  

### **Authentication**  
- `POST /api/users/register` - Register a new user  
- `POST /api/users/login` - Login and retrieve a JWT token  
- `GET /api/users/profile` - Get logged-in user profile (protected)  

### **Budget Management**  
- `GET /api/budget` - Retrieve user’s budget details  
- `POST /api/budget` - Create or update budget  

### **Expense Management**  
- `GET /api/expenses` - Retrieve all expenses  
- `POST /api/expenses` - Add a new expense  
- `PUT /api/expenses/:id` - Update an expense  
- `DELETE /api/expenses/:id` - Delete an expense  

### **Financial Goals**  
- `GET /api/goals` - Retrieve all financial goals  
- `POST /api/goals` - Add a new goal  
- `PUT /api/goals/:id` - Update a goal  
- `DELETE /api/goals/:id` - Delete a goal  

### **AI-Powered Financial Insights**  
- `POST /api/ai/response` - Get AI-generated financial advice  
- `POST /api/ai/optimize` - Get AI-powered budget optimization suggestions  

### **Spending Trends & Analytics**  
- `GET /api/trends` - Retrieve spending trends based on category & month  

### **Summary & Reports**  
- `GET /api/summary/monthly` - Retrieve monthly budget summary  

### **Notifications & Reminders** (Future)  
- `GET /api/notifications` - Get user notifications  
- `POST /api/notifications` - Create a new notification  

---

## Usage

- **Sign Up**: Create an account to start using the platform.
- **Set Budget**: Define your monthly budget and categorize spending.
- **Track Expenses**: Log expenses and monitor your spending habits.
- **Ask for Advice**: Use the AI chatbot for financial guidance.
- **Visualize Trends**: Gain insights through interactive charts.

## Future Enhancements

- **Integration with Bank APIs**: Automatically fetch transaction data.
- **Advanced Risk Profiling**: Offer investment advice based on user preferences.
- **Mobile App**: Create a mobile version for easier access.
- **Community Forum**: Allow users to discuss financial strategies.

## Contributing

We welcome contributions to improve BudgetMentor! If you'd like to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m 'Add feature-name'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more details.

## Contact

For queries or feedback, contact:
- **Name**: Shubham
- **Portfolio**: [www.shubhamprakash26.netlify.com](http://www.shubhamprakash26.netlify.com)
- **Email**: shubhamprakash26@gmail.com
