import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { USER_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { toast } from 'sonner';

const ViewStudentPage = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getUser/${id}`, { withCredentials: true });
        if (res.data.success) {
          setStudent(res.data.data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch student details");
        setLoading(false);
      }
    };

    fetchStudentData();
  }, [id]);

  if (loading) {
    return <div className="text-center text-xl">Loading...</div>;
  }
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="space-y-6">
          <h1 className="text-3xl font-semibold text-gray-700">Student Details</h1>

          {/* Personal Information Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-600">Personal Information</h2>
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div><strong>Name:</strong> {student.fullname}</div>
              <div><strong>Email:</strong> {student.email}</div>
              <div><strong>Library ID:</strong> {student.libraryId}</div>
              <div><strong>Fines:</strong> ${student.fines}</div>

            </div>
          </div>

          {/* Borrowed Books Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-600">Borrowed Books</h2>
            <Table className="mt-4">
              <TableCaption>Books currently borrowed by the student</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>Cover</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Borrowed Date</TableHead>
                  <TableHead>Due Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {student.borrowedBooks.length > 0 ? (
                  student.borrowedBooks.map((borrowedBook) => (
                    <TableRow key={borrowedBook.transactionId}>
                      <TableCell>
                        <img src={borrowedBook?.book?.coverImage} alt={borrowedBook?.book?.title} className="w-16 h-24 object-cover rounded-md" />
                      </TableCell>
                      <TableCell>{borrowedBook?.book?.title}</TableCell>
                      <TableCell>{borrowedBook?.book?.author}</TableCell>
                      <TableCell>{new Date(borrowedBook.borrowedDate).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(borrowedBook.dueDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan="5" className="text-center text-gray-500">No borrowed books</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudentPage;
