import { User } from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

//Sign Up
export const register = async (req, res) => {
  try {
    const { fullname, email, password, role } = req.body;
    if (!fullname || !email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    const file = req.file;
    let profilePhotoUrl = "";

    if (file) {
      // Cloudinary file upload
      const fileUrl = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
      profilePhotoUrl = cloudResponse.secure_url;
    } else {
      // Default profile photo
      profilePhotoUrl =
        "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=";
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email id",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      password: hashedPassword,
      role,
      profile: {
        profilePhoto: profilePhotoUrl,
      },
    });

    return res.status(200).json({
      message: "Account created successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Login
export const Login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        message: "Incorrect email or password",
        success: false,
      });
    }

    //Check role is correct or not

    if (role != user.role) {
      return res.status(400).json({
        message: "Account does not exist with correct role",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    //For security purpose
    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async (req, res) => {
  try {
    return res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged Out Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, bio } = req.body;

    const file = req.file;

    // if (file) {
    //   //Cloudinary
    //   const fileUrl = getDataUri(file);
    //   const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
    // }

    const userId = req.id;
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        userId,
        success: false,
      });
    }

    //Updating data
    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (bio) user.profile.bio = bio;

    user = {
      _id: user.id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res.status(200).json({
      message: "Profile Updated Successfully",
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const getUserbyId=async(req,res)=>{
  try{
    const userId=req.params.id;
   const user = await User.findById(userId).populate({
     path: "borrowedBooks.book", // Populate the book field in borrowedBooks
     model: "BookModel", // Explicitly specify the Book model to populate the `book` field
   });

    if(!user)
    {
      return res.status(400).json({
        message:"User not found",
        success:false
      })
    }
    return res.status(200).json({
      data:user,
      success:true
    })

  }
  catch(error)
  {
    console.log(error);
    return res.json({
      message:"Server Error",
      success:false
    })

  }}

export const getAllBorrowedBooks=async(req,res)=>{
  try{
    const userId=req.id;
    const user=await User.findById(userId);
    if(!user)
    {
      return res.status(400).json({
        message:"User not found",
        status:false
      })
    }
   const allBooks = await user.populate({
     path: "borrowedBooks", 
     populate: {
       path: "book",
       model: "BookModel",
     },
   });
    return res.status(200).json({
      books:allBooks,
      success: true,
    });
  }
  catch(error)
  {
    console.log(error);
    return res.json({
      message:"Server Error"
    })

  }
}
