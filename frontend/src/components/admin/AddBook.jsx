import { Label } from '@radix-ui/react-label';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader } from 'lucide-react';
import axios from 'axios';
import { ADMIN_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const AddBook = () => {

  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    author: "",
    genre: "",
    ISBN: '',
    publicationYear: '',
    totalCopies: '',
    file: ''
  })

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

      // Create formdata inside submit handler to use latest input state
      const formdata = new FormData();
      formdata.append("title", input.title);
      formdata.append("author", input.author);
      formdata.append("genre", input.genre);
      formdata.append("ISBN", input.ISBN);
      formdata.append("totalCopies", input.totalCopies);
      formdata.append("publicationYear", input.publicationYear);
      formdata.append("file", input.file);

      const res = await axios.post(`${ADMIN_API_END_POINT}/addBook`, formdata, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        withCredentials: true
      });

      if (res.data.success) {
        navigate("/admin/books");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background px-4">
      <div className="w-full max-w-sm border border-border shadow-xl bg-card rounded-lg p-6">
        <h1 className="text-xl font-bold text-foreground mb-4">Create New Book</h1>
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

          {/* Author & Genre */}
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

            <div>
              <Label htmlFor="genre" className="block text-sm font-medium text-foreground">
                Genre
              </Label>
              <select
                id="genre"
                name="genre"
                value={input.genre}
                onChange={changeEventHandler}
                required
                className="px-4 py-2 rounded-md border w-full"
              >
                <option value="" disabled>Select a genre</option>
                <option value="Science">Science</option>
                <option value="Fiction">Fiction</option>
                <option value="Business">Business</option>
                <option value="Technology">Technology</option>
                <option value="History">History</option>
                <option value="Arts">Arts</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Programming">Programming</option>
              </select>
            </div>
          </div>

          {/* ISBN & Publication Date */}
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

            <div className="w-full md:w-1/2">
              <Label htmlFor="publicationYear" className="block text-sm font-medium text-foreground">
                Publication Year
              </Label>
              <Input
                id="publicationYear"
                name="publicationYear"
                type="number"
                placeholder="2021"
                value={input.publicationYear}
                onChange={changeEventHandler}
                required
                min="1900"
                max={new Date().getFullYear()} // Dynamic max value for the current year
                className="bg-background text-foreground"
              />
            </div>

          </div>

          {/* Copies Available & Cover Image */}
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="w-full md:w-1/2">
              <Label htmlFor="totalCopies" className="block text-sm font-medium text-foreground">
                No of Copies
              </Label>
              <Input
                id="totalCopies"
                name="totalCopies"
                type="number"
                placeholder="10"
                value={input.totalCopies}
                min="5"
                onChange={changeEventHandler}
                required
                className="w-full"
              />
            </div>

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
                'Create New Book'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBook;
