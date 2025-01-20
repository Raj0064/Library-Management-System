import useGetSingleBook from '@/hooks/useGetSingleBook';
import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowBigLeft } from 'lucide-react';

const ViewBook = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.id;
  useGetSingleBook(bookId);

  const { singlebook } = useSelector((store) => store.book);
  const book = singlebook;

  // Check if publicationYear is valid
 

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold text-blue-violet-600 dark:text-blue-violet-300 mb-6">
        View Book
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={book.coverImage}
            alt={book.title}
           className="h-96 w-64 object-cover rounded-md shadow-md border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-3xl mb-4">{book.title}</h1>
            <ul className="space-y-3 text-lg text-gray-800 dark:text-gray-200">
              <li>
                <span className="font-medium">Author:</span> {book.author}
              </li>
              <li>
                <span className="font-medium">Genre:</span> {book.genre}
              </li>
              <li>
                <span className="font-medium">ISBN:</span> {book.ISBN}
              </li>
              <li>
                <span className="font-medium">Publication Year:</span> {book.publicationYear}
              </li>
              <li>
                <span className="font-medium">Total Copies:</span> {book.totalCopies}
              </li>
              <li>
                <span className="font-medium">Available Copies:</span> {book.copiesAvailable}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              onClick={() => navigate(`/admin/books`)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-md"
            >
              <ArrowBigLeft /> Back
            </Button>
            <Button
              onClick={() => navigate(`/admin/updatebook/${bookId}`)}
              className="text-white px-4 py-2 rounded-md"
            >
              Update Book
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBook;
