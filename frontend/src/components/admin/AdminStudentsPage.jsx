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
import { Trash2, ViewIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import useGetAllStudents from '@/hooks/useGetAllStudents';

const AdminStudentsPage = () => {
  const navigate = useNavigate();
  useGetAllStudents();
  const { students } = useSelector(store => store.student);

  const [searchQuery, setSearchQuery] = useState('');

  // Filter students based on search query
  const filteredStudents = students.filter(
    (student) =>
      student?.fullname?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student?.libraryId?.includes(searchQuery)
  );

  // Delete student function
  const deletestudent = async (student_id) => {
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/deletestudent/${student_id}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar />
      <div>
        <div className='flex justify-between items-center'>
          <h1>Students Management</h1>
          <div className='flex items-center gap-3'>
            <Input
              type="text"
              placeholder="Search by name, email Id"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-violet-500"
            />
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>A list of students</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium ">ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead className="font-medium ">Borrow</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length > 0 ?
                filteredStudents.map((student) => (
                  <TableRow key={student._id}>
                    <TableCell className="font-medium ">{student.libraryId}</TableCell>
                    <TableCell >{student.fullname}</TableCell>
                    <TableCell>{student.email}</TableCell>
                    <TableCell>{student.borrowedBooks.length}</TableCell>

                    <TableCell className="text-right">
                      <div className="flex justify-center space-x-3">
                        <Link to={`/admin/viewstudent/${student._id}`} className='cursor-pointer'>
                          <ViewIcon />
                        </Link>
                        <Trash2 className='cursor-pointer' onClick={(e) => { deletestudent(student._id) }} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))
                :
                <TableRow><TableCell>No students Available</TableCell></TableRow>
              }
            </TableBody>
          </Table>
        </div>
      </div>
      
    </div>
  );
}

export default AdminStudentsPage;
