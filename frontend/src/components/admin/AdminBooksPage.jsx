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

const AdminBooksPage = () => {
  const navigate=useNavigate();
  useGetAllBooks();
  const {books}=useSelector(store=>store.book);
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

  const deleteBook=async(book_id)=>{
    try {
      const res = await axios.delete(`${ADMIN_API_END_POINT}/deleteBook/${book_id}`, { withCredentials: true });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <Navbar/>
      <div>
        <div className='flex justify-between items-center'>
        <h1>Book Management</h1>
         <div className='flex items-center gap-3'>
          <Button className="btn btn-primary" onClick={(e)=>navigate("/admin/addbook")}>Add Book</Button>
            <Input type="text" placeholder="Search by title, author, genre, or ISBN"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-violet-500"
            />
          </div>
        </div>
        <div>
          <Table>
            <TableCaption>A list of books Available</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="font-medium hidden md:table-cell">ISBN</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Author</TableHead>
                <TableHead className="font-medium hidden md:table-cell">Genre</TableHead>
                <TableHead >Available</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBooks.length>0  ? 
                filteredBooks.map((book)=>(
                 <TableRow key={book._id}>
                   <TableCell className="font-medium hidden md:table-cell">{book.ISBN}</TableCell>
                   <TableCell >{book.title}</TableCell>
                   <TableCell>{book.author}</TableCell>
                   <TableCell className="hidden md:table-cell">{book.genre}</TableCell>
                   <TableCell>{book.copiesAvailable}/{book.totalCopies}</TableCell>

                   <TableCell className="text-right">
                     <div className="flex justify-center space-x-3">
                       <Link to={`/admin/updatebook/${book._id}`} className='cursor-pointer'><PencilLine /></Link>
                       <Trash2 className='cursor-pointer' onClick={(e)=>{deleteBook(book._id)}}/>
                       <Link to={`/admin/viewbook/${book._id}`} className='cursor-pointer'>  <ViewIcon /></Link>
                     </div>
                   </TableCell>
                 </TableRow>
               ))
              :
                <TableRow><TableCell>No books Available</TableCell></TableRow>
              }
            </TableBody>
          </Table>

        </div>
      </div>
    </div>
  );
}

export default AdminBooksPage;
