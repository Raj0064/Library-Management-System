import { setBorrowedBooks } from "@/redux/bookSlice";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetBorrowedBooks = () => {
  const dispatch = useDispatch();
const {borrowedBooks}=useSelector((store)=>store.book);
  useEffect(() => {
    const fetchBorrowedBooks = async () => {
      try {
        const res = await axios.get(`${USER_API_END_POINT}/getBorrowedBooks`, {
          withCredentials: true,
        });
        console.log(res.data.books.borrowedBooks);
        if (res.data.success) {
          dispatch(setBorrowedBooks(res?.data?.books?.borrowedBooks));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchBorrowedBooks();
  }, [dispatch,borrowedBooks]);
};

export default useGetBorrowedBooks;
