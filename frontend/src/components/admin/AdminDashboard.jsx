import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link } from 'react-router-dom';
import { BookOpen, Users, ClipboardList, Clock } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';

const AdminDashboard = () => {
  const [data, setData] = useState({
    totalStudents: 0,
    totalBooks: 0,
    totalCopies: 0,
    borrowedBooks: 0,
    overdueBooks: 0,
  });

  const [recentTransactions, setRecentTransactions] = useState([]);


  // Fetch the necessary data from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch dashboard stats
        const response = await axios.get(`${ADMIN_API_END_POINT}/dashboard-stats`, { withCredentials: true });
        setData(response.data);  // Assuming your API returns the necessary stats

        // Fetch recent transactions
        const transactionsResponse = await axios.get(`${ADMIN_API_END_POINT}/recent-transactions`, { withCredentials: true });
  
        setRecentTransactions(transactionsResponse.data.data);

      } catch (error) {
        console.error('Error fetching dashboard data', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <Navbar />
      <div className="container mx-auto mt-12 p-6">
        <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300 text-center mb-8">
          Admin Dashboard
        </h1>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Students */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border-l-8 border-blue-500">
            <Users size={48} className="mx-auto text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Total Students
            </h3>
            <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300">
              {data.totalStudents}
            </h1>
            <Link to="/admin/allusers" className="mt-4 inline-block text-blue-500 hover:text-blue-700 font-medium">
              Manage Students →
            </Link>
          </div>

          {/* Total Books */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border-l-8 border-green-500">
            <BookOpen size={48} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Total Books
            </h3>
            <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300">
              {data.totalBooks}
            </h1>
            <Link to="/admin/books" className="mt-4 inline-block text-green-500 hover:text-green-700 font-medium">
              View All Books →
            </Link>
          </div>

          {/* Borrowed Books */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border-l-8 border-yellow-500">
            <ClipboardList size={48} className="mx-auto text-yellow-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Borrowed Books
            </h3>
            <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300">
              {data.borrowedBooks}
            </h1>
            <Link to="/admin/books" className="mt-4 inline-block text-yellow-500 hover:text-yellow-700 font-medium">
              View Borrowed Books →
            </Link>
          </div>

          {/* Overdue Books */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center border-l-8 border-red-500">
            <Clock size={48} className="mx-auto text-red-500 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Overdue Books
            </h3>
            <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300">
              {data.overdueBooks}
            </h1>
            <Link to="/admin/books" className="mt-4 inline-block text-red-500 hover:text-red-700 font-medium">
              Check Overdue Books →
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            Recent Transactions
          </h2>
          <ul className="space-y-4 text-gray-600 dark:text-gray-300">
            {recentTransactions.length === 0 ? (
              <li>No recent transactions found.</li>
            ) :(
              recentTransactions.length === 0 ? (
                <li>No recent transactions found.</li>
              ) : (
                recentTransactions.map((transaction) => (
                  <li key={transaction._id} className="flex justify-between">
                    <span>
                      <strong>{transaction.user.fullname}</strong> borrowed <strong>{transaction.book ? transaction.book.title : 'N/A'}</strong>
                      - <span className="text-blue-500">Due: {transaction.dueDate ? new Date(transaction.dueDate).toLocaleDateString() : 'N/A'}</span>
                    </span>
                    <span>{transaction.status === "Returned" ? "Returned" : "Borrowed"}</span>
                  </li>
                ))
              )
            )
}
          </ul>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 flex flex-wrap gap-6 justify-center">
          <Link to="/admin/addbook" className="bg-blue-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-blue-700">
            + Add New Book
          </Link>
          <Link to="/admin/allusers" className="bg-green-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-green-700">
            👤 Manage Students
          </Link>
        </div>
      </div>
      
    </div>
  );
};

export default AdminDashboard;
