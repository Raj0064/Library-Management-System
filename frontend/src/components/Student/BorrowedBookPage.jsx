import React from 'react';
import BorrowedBookCard from './BorrowedBookCard';
import useGetBorrowedBooks from '@/hooks/useGetBorrowedBooks';
import { useSelector } from 'react-redux';
import Navbar from '../shared/Navbar';

const BorrowedBooksPage = () => {
  useGetBorrowedBooks();
  const { borrowedbooks } = useSelector((store) => store.book);

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto p-6">
        {borrowedbooks.length > 0 ? (
          <div className="grid grid-cols-3 md:grid-cols-4 gap-6">
            {borrowedbooks.map((book) => (
              <BorrowedBookCard key={book?._id} book={book?book:""} />
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-500">You have no borrowed books.</p>
        )}
      </div>
    </>
  );
};

export default BorrowedBooksPage;
