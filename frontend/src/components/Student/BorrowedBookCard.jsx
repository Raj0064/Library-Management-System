import React from 'react';
import { Button } from '../ui/button';
import { toast } from 'sonner';
import axios from 'axios';
import { BOOK_API_END_POINT } from '@/utils/constant';

const BorrowedBookCard = ({ book }) => {
  const { _id: bookId, borrowedDate, dueDate, transactionId } = book;
  const { title, author, coverImage } = book.book;

  const isOverdue = new Date() > new Date(dueDate);

  const returnBook = async () => {
    try {
      const res = await axios.post(`${BOOK_API_END_POINT}/return/${transactionId}`, {}, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Error returning the book. Please try again.';
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
      <div className="flex-shrink-0">
        <img
          src={coverImage}
          alt={title}
          className="h-40 w-28 object-cover rounded-lg shadow-md"
        />
      </div>

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <h2 className="text-sm">{author}</h2>
          <p className="text-sm mt-2">
            <span className="font-medium">Borrowed:</span> {new Date(borrowedDate).toLocaleDateString()}
          </p>
          <p className={`text-sm mt-1 ${isOverdue ? 'font-bold' : ''}`}>
            <span className="font-medium">Due Date:</span> {new Date(dueDate).toLocaleDateString()}
          </p>
        </div>

        <div className="mt-4 md:mt-0">
          <Button
            onClick={returnBook}
            className="px-4 py-2 rounded-md"
          >
            Return Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BorrowedBookCard;
