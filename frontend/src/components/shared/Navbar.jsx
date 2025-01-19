import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CircleUserRound, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  // console.log(user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const LogOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Book<span className="text-red-500">Nest</span>
          </h1>
        </div>
        <div className="flex items-center gap-10">
          <ul className="flex font-medium items-center gap-5">
            {user && user.role === "admin" ? (
              <>
                <li>
                  <Link to="/admin/dashboard">Dashboard</Link>
                </li>
                <li>
                  <Link to="/admin/books">Books</Link>
                </li>
                <li>
                  <Link to="/admin/users">Users</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/jobs">Search Books</Link>
                </li>
                <li>
                  <Link to="/browse">Borrowed Books</Link>
                </li>

              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-3">
              <Button variant="outline">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="hover:bg-purple-700 bg-purple-900">
                {" "}
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="max-w-fit p-2">
                <div className="flex flex-col items-start">
                  <div className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user?.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                        {user?.profile?.bio}
                      </p>
                    </div>
                  </div>
                  {user?.role === 'recruiter' ? "" : (
                    <Button variant="link" className="flex gap-3">
                      <CircleUserRound />
                      <span className="font-medium">
                        <Link to="/profile"> Profile </Link>
                      </span>
                    </Button>
                  )}
                  <Button
                    variant="link"
                    className="flex gap-3"
                    onClick={LogOutHandler}
                  >
                    <LogOut />
                    <span className="font-medium">Log Out</span>
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
