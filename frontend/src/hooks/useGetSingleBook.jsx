import { setSingleBook } from "@/redux/bookSlice";
import { BOOK_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetSingleBook = (bookId) => {
  const {singlebook}=useSelector(store=>store.book);
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
  }, [dispatch,singlebook]);
}
export default useGetSingleBook;