import { setSingleBook } from "@/redux/bookSlice";
import { BOOK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSingleBook = (bookId) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSingleBook = async () => {
      try {
        const res = await axios.get(`${BOOK_API_END_POINT}/get/${bookId}`, {
          withCredentials: true
        });


        if (res.data.success) {
          dispatch(setSingleBook(res.data.book))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchSingleBook();
  }, [dispatch]);
}
export default useGetSingleBook;