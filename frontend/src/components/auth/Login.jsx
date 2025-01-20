import { useForm } from "react-hook-form";
import { useState } from "react";
import { Eye, EyeClosed, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import Navbar from "../shared/Navbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Loading } = useSelector((store) => store.auth);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto font-sans">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-4/5 md:max-w-sm border border-gray-200 rounded-md p-6 my-10 shadow-md"
        >
          <h1 className="font-bold text-2xl mb-5">Login</h1>

          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc@gmail.com"
              {...register("email", {
                required: "Email is required.",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address." },
              })}
              className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          <div className="relative">
            <Label>Password</Label>
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="******"
              {...register("password", {
                required: "Password is required.",
                minLength: { value: 3, message: "Password must be at least 3 characters long." },
              })}
              className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            <button
              type="button" // Prevent form submission
              className="absolute top-1/2 right-2 "
              onClick={togglePasswordVisibility}
            >
              {showPassword ? <Eye color="grey" /> : <EyeOff color = "grey" />}
            </button>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-1">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  {...register("role", { required: "Role is required." })}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="admin"
                  {...register("role", { required: "Role is required." })}
                  className="cursor-pointer"
                />
                <Label>Admin</Label>
              </div>
            </RadioGroup>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {Loading ? (
            <Button className="w-full my-3 flex justify-center items-center" disabled>
              <Loader2 className="animate-spin mr-2" /> Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-3">
              Log In
            </Button>
          )}

          <div className="mt-4 text-center">
            <span>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-600">
                Sign Up
              </Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
