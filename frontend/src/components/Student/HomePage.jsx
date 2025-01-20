import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    } else if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // Handle search and navigate to search page
  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/user/searchbooks?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Predefined popular search keywords
  const popularKeywords = [
    "Science", "Fiction", "Business", "Technology", "Medical",
    "History", "Arts", "Mathematics", "Programming", "Law"
  ];

  return (
    <div>
      <Navbar />
      <header className="text-center py-16 bg-gradient-to-br from-blue-800 to-violet-600 text-white">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to the Library</h1>
        <p className="text-lg md:text-xl mb-8">Discover, Borrow, and Explore Knowledge</p>
        <div className="flex justify-center gap-2">
          <input
            type="text"
            placeholder="Search for books, authors, or ISBNs..."
            className="px-4 py-2 rounded-md text-black w-full max-w-md"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button
            className="px-4 py-2 bg-violet-500 hover:bg-violet-700 rounded-md"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {popularKeywords.map((keyword, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-white text-violet-700 rounded-md hover:bg-violet-200"
              onClick={() => navigate(`/user/searchbooks?query=${encodeURIComponent(keyword)}`)}
            >
              {keyword}
            </button>
          ))}
        </div>
      </header>
      
    </div>
  );
};

export default HomePage;
