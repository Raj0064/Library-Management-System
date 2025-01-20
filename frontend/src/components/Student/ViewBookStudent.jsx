import useGetSingleBook from '@/hooks/useGetSingleBook';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../ui/button';
import { ArrowBigLeft } from 'lucide-react';
import { BOOK_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setBorrowedBooks } from '@/redux/bookSlice';
import useGetBorrowedBooks from '@/hooks/useGetBorrowedBooks';

const ViewBookStudent = () => {
  const navigate = useNavigate();
  const params = useParams();
  const bookId = params.id;
  useGetSingleBook(bookId);
  const dispatch = useDispatch();
  useGetBorrowedBooks();

  const { singlebook } = useSelector((store) => store.book);
  const {borrowedbooks} = useSelector((store) => store.book);

  const isBorrowed = borrowedbooks.some((book) => book.book._id === bookId);

  const borrowBook = async () => {
    try {
      const res = await axios.post(`${BOOK_API_END_POINT}/borrow/${bookId}`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
  
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }

  if (!singlebook) {
    return (
      <div className="text-center p-6">
        <p>Loading book information...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6  rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold  mb-6">
        View Book
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Cover */}
        <div className="flex justify-center">
          <img
            src={singlebook.coverImage}
            alt={singlebook.title}
            className="h-96 w-64 object-cover rounded-md shadow-md border border-gray-200 dark:border-gray-700"
          />
        </div>

        {/* Book Details */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="font-semibold text-3xl mb-4">{singlebook.title}</h1>
            <ul className="space-y-3 text-lg text-gray-800 dark:text-gray-200">
              <li>
                <span className="font-medium">Author:</span> {singlebook.author}
              </li>
              <li>
                <span className="font-medium">Genre:</span> {singlebook.genre}
              </li>
              <li>
                <span className="font-medium">ISBN:</span> {singlebook.ISBN}
              </li>
              <li>
                <span className="font-medium">Publication Year:</span> {singlebook.publicationYear}
              </li>
              <li>
                <span className="font-medium">Total Copies:</span> {singlebook.totalCopies}
              </li>
              <li>
                <span className="font-medium">Available Copies:</span> {singlebook.copiesAvailable}
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-6">
            <Button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 text-white px-4 py-2 rounded-md"
            >
              <ArrowBigLeft /> Back
            </Button>
            <Button
            disabled={isBorrowed}
              onClick={borrowBook}
              className="text-white px-4 py-2 rounded-md"
            >
              {isBorrowed ? "Already Borrowed" : "Borrow Book"}
            </Button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookStudent;
