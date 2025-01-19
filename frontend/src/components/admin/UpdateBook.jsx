import { Label } from '@radix-ui/react-label';
import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate, useParams } from 'react-router-dom';
import useGetSingleBook from '@/hooks/useGetSingleBook';
import { useSelector } from 'react-redux';

const UpdateBook = () => {

  const navigate = useNavigate();

  const params=useParams();
  const bookId=params.id;
  useGetSingleBook(bookId);

  const {singlebook}=useSelector(store=>store.book);
  const book=singlebook;
  console.log(book);
  
  const [input, setInput] = useState({
    title: "",
    author: "",
    genre: "",
    ISBN: '',
    publicationDate: '',
    totalCopies: '',
    file: ''
  })

  useEffect(() => {
    if (book) {
      // Assuming book.publicationDate might not be in 'YYYY-MM-DD' format
      const formattedDate = new Date(book.publicationDate).toISOString().split('T')[0];

      setInput({
        title: book.title || "",
        author: book.author || "",
        genre: book.genre || "",
        ISBN: book.ISBN || "",
        publicationDate: formattedDate || "",  // Convert to 'YYYY-MM-DD' format
        totalCopies: book.totalCopies || "",
        file: ""
      });
    }
  }, [book]);

  const formdata = new FormData();
  formdata.append("title", input.title);
  formdata.append("author", input.author);
  formdata.append("genre", input.genre);
  formdata.append("ISBN", input.ISBN);
  formdata.append("totalCopies", input.totalCopies);

  formdata.append("file", input.file);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  }

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(`${ADMIN_API_END_POINT}/updateBook/${bookId}`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      })
      if (res.data.success) {
        navigate("/admin/books");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    } finally {
      setLoading(false);
    }
  }
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm border border-border shadow-xl bg-card rounded-lg p-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Update Book</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          {/* Title */}
          <div>
            <Label htmlFor="title" className="block text-sm font-medium text-foreground">
              Title
            </Label>
            <Input
              id="title"
              name="title"
              value={input.title}
              placeholder="Enter the Book Name"
              onChange={changeEventHandler}
              required
            />
          </div>

          {/* Author */}
          <div className='flex flex-col md:flex-row gap-4 justify-between'>

            <div>
              <Label htmlFor="author" className="block text-sm font-medium text-foreground">
                Author
              </Label>
              <Input
                id="author"
                name="author"
                value={input.author}
                placeholder="Name the author"
                onChange={changeEventHandler}
                required
              />
            </div>

            {/* Genre */}
            <div>
              <Label htmlFor="genre" className="block text-sm font-medium text-foreground">
                Genre
              </Label>
              <Input
                id="genre"
                name="genre"
                type="text"
                value={input.genre}
                placeholder="Enter the genre"
                onChange={changeEventHandler}
                required
              />
            </div>
          </div>

          {/* ISBN */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/2">
              <Label htmlFor="ISBN" className="block text-sm font-medium text-foreground">
                ISBN
              </Label>
              <Input
                id="ISBN"
                name="ISBN"
                type="text"
                placeholder="9876-4564-6759"
                value={input.ISBN}
                onChange={changeEventHandler}
                required
                className="w-full"
              />
            </div>

            {/* publicationDate */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="publicationDate" className="block text-sm font-medium text-foreground">
                Publication Date
              </Label>
              <Input
                className="bg-background text-foreground"
                id="publicationDate"
                name="publicationDate"
                type="date"
                value={input.publicationDate}
                onChange={changeEventHandler}
                required
              />
            </div>

          </div >


          <div className="flex flex-col md:flex-row gap-4 justify-between">

            {/* Copies Available */}
            <div className="w-full md:w-1/2">
              <Label htmlFor="ISBN" className="block text-sm font-medium text-foreground">
                No of Copies
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                placeholder="10"
                value={input.totalCopies}
                minvalue="5"
                onChange={changeEventHandler}
                required
                className="w-full"
              />
            </div>

            {/* Image */}
            <div>
              <Label htmlFor="coverImage" className="block text-sm font-medium text-foreground">
                Cover Image
              </Label>
              <Input
                id="coverImage"
                name="coverImage"
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
              />
            </div>

          </div>


          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader className="animate-spin" size={16} />
                  Creating...
                </span>
              ) : (
                'Update Book'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateBook;