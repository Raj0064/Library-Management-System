import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { PencilIcon, PencilLine, Trash2, ViewIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import useGetAllBooks from '@/hooks/useGetAllBooks';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';

const BookSearchPage = () => {
  const navigate = useNavigate();
  useGetAllBooks();
  const { books } = useSelector(store => store.book);
  console.log(books);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.ISBN.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div>
        <div className='flex justify-between items-center'>
          <h1>Search Books</h1>
          <div className='flex items-center gap-3'>
            <Input type="text" placeholder="Search by title, author, genre, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <Table className="w-full border-collapse border border-gray-200 dark:border-gray-700 text-sm">
            <TableCaption className="text-gray-500 dark:text-gray-400 py-4">
              A list of books available in the library.
            </TableCaption>
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
              {filteredBooks.length > 0 ? (
                filteredBooks.map((book) => (
                  <TableRow
                    key={book._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                  >
                    {/* Book Cover */}
                    <TableCell className="px-4 py-2">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="h-28 min-w-fit w-auto rounded-md shadow-md object-cover"
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
                        <Button className="bg-blue-violet-600 text-white hover:bg-blue-violet-700">
                          View Book
                        </Button>
                        {book.copiesAvailable > 0 && (
                          <Button className="bg-green-600 text-white hover:bg-green-700">
                            Borrow
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="text-center py-4 text-gray-500 dark:text-gray-400"
                  >
                    No books found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}

export default BookSearchPage;
