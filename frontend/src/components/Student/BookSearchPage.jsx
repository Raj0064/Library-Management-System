import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { toast } from 'sonner';
import { useDebounce } from 'use-debounce';
import useGetAllBooks from '@/hooks/useGetAllBooks';

const BookSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { books, error, loading } = useSelector(store => store.book);

  useGetAllBooks();
  // Extract search query from URL
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('query') || '';

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500); // Debouncing search input

  useEffect(() => {
    if (error) {
      toast.error("Failed to load books.");
    }
  }, [error]);

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  // Handle search manually from search page
  const handleSearch = () => {
    navigate(`/user/searchbooks?query=${encodeURIComponent(searchQuery)}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div>
        <div className='flex justify-between items-center'>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">Search Books</h1>
          <div className='flex items-center gap-3'>
            <Input
              type="text"
              placeholder="Search by title, author, genre, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        

        <div className="mt-6">
          <Table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm">
            {/* If there are no books */}
            {filteredBooks.length === 0 && searchQuery && (
              <TableCaption className="mt-4 text-center text-gray-500 dark:text-gray-400">
                <p>No books found for your search query.</p>
              </TableCaption>
            )}
            <TableHeader className="bg-gray-100 dark:bg-gray-800">
              <TableRow>
                <TableHead className="px-4 py-2 text-left">Cover</TableHead>
                <TableHead className="px-4 py-2 text-left">Title & Author</TableHead>
                <TableHead className="hidden md:table-cell px-4 py-2 text-left">Genre</TableHead>
                <TableHead className="px-4 py-2 text-left">Availability</TableHead>
                <TableHead className="px-4 py-2 text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.map((book) => (
                <TableRow
                  key={book._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                >
                  {/* Book Cover */}
                  <TableCell className="px-4 py-2">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="h-28 w-auto max-w-[calc(2/3*7rem)] rounded-md shadow-md object-cover"
                    />
                  </TableCell>

                  {/* Title and Author */}
                  <TableCell className="px-4 py-2">
                    <h1 className="font-semibold text-gray-800 dark:text-gray-100">
                      {book.title}
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400">{book.author}</p>
                  </TableCell>

                  {/* Genre - Hidden on smaller screens */}
                  <TableCell className="hidden md:table-cell px-4 py-2 text-gray-600 dark:text-gray-300">
                    {book.genre}
                  </TableCell>

                  {/* Availability */}
                  <TableCell className="px-4 py-2">
                    {book.copiesAvailable > 0 ? (
                      <span className="px-2 py-1 text-green-800 bg-green-100 rounded-md dark:bg-green-900 dark:text-green-200">
                        Available
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-red-800 bg-red-100 rounded-md dark:bg-red-900 dark:text-red-200">
                        Not Available
                      </span>
                    )}
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="px-4 py-2 text-center">
                    <div className="flex justify-center space-x-3">
                      <Button onClick={() => navigate(`/user/viewbook/${book._id}`)}>View Book</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default BookSearchPage;
