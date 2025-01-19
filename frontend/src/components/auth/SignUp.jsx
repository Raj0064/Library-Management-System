import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";  // Import React Hook Form
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Loading } = useSelector(store => store.auth);

  // Initialize react-hook-form
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      dispatch(setLoading(true));

      // Send data as JSON, no need for FormData anymore
      const res = await axios.post(`${USER_API_END_POINT}/register`, data, {
        headers: {
          "Content-Type": "application/json",  // Send as JSON
        },
        withCredentials: true,
      });

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto font-sans">
        <form
          onSubmit={handleSubmit(onSubmit)}  // Handle form submission using React Hook Form
          className="w-4/5 md:max-w-sm border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-2xl mb-5">Sign Up</h1>

          {/* Full Name */}
          <div className="my-2">
            <Label>Full Name</Label>
            <Input
              type="text"
              placeholder="John Cena"
              {...register("fullname", { required: "Full Name is required" })}  // Register input field
              className={`border ${errors.fullname ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.fullname && <p className="text-red-500 text-sm">{errors.fullname.message}</p>}
          </div>

          {/* Email */}
          <div className="my-2">
            <Label>Email</Label>
            <Input
              type="email"
              placeholder="abc@gmail.com"
              {...register("email", {
                required: "Email is required",
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" },
              })}
              className={`border ${errors.email ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="my-2">
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="******"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "Password must be at least 6 characters long" },
              })}
              className={`border ${errors.password ? "border-red-500" : "border-gray-300"}`}
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>

          {/* Role Selection */}
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-1">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="student"
                  {...register("role", { required: "Role is required" })}
                  className="cursor-pointer"
                />
                <Label>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  value="admin"
                  {...register("role", { required: "Role is required" })}
                  className="cursor-pointer"
                />
                <Label>Admin</Label>
              </div>
            </RadioGroup>
            {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
          </div>

          {/* Submit Button */}
          {Loading ? (
            <Button className="w-full my-3" disabled>
              <Loader2 className="animate-spin mr-2" /> Please Wait...
            </Button>
          ) : (
            <Button type="submit" className="w-full my-3">
              Sign Up
            </Button>
          )}

          <div className="text-center mt-4">
            <span>Already have an account? <Link to="/login" className="text-blue-600">Login</Link></span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
