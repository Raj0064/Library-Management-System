import { setBooks } from "@/redux/bookSlice";
import { BOOK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllBooks = () => {
  const dispatch = useDispatch();
  const {books}=useSelector((store)=>store.book);
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${BOOK_API_END_POINT}/allbooks`, { withCredentials: true });
   
        if (res.data.success) {
          console.log(res.data);
          dispatch(setBooks(res.data.data))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllBooks();
  }, [dispatch,books]);
}
export default useGetAllBooks;