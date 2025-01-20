
import { setStudents } from "@/redux/studentSlice";
import { ADMIN_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllStudents = () => {
  const students = useSelector((store) => store.student.students);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllStudents = async () => {
      try {
        const res = await axios.get(`${ADMIN_API_END_POINT}/getAllStudents`, { withCredentials: true });

        if (res.data.success) {
          console.log(res.data);
          dispatch(setStudents(res.data.data))
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllStudents();
  }, [dispatch,students]);
}
export default useGetAllStudents;