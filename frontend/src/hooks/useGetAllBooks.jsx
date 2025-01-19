import { setBooks } from "@/redux/bookSlice";
import { BOOK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllBooks = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get(`${BOOK_API_END_POINT}/allbooks`, { withCredentials: true });
   

        if (res.data.success) {
          // console.log(res.data);
          dispatch(setBooks(res.data.data))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllBooks();
  }, [dispatch]);
}
export default useGetAllBooks;