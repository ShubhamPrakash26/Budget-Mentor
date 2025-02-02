import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <footer className="bg-white border-t mt-auto py-4">
        <div className="container mx-auto px-4 text-center text-gray-600">
          © 2024 BudgetMentor. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Layout;