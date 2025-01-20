
import { Book } from "../models/BookModel.js";
import { Transaction } from "../models/TransactionModel.js";
import { User } from "../models/UserModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, ISBN, publicationYear, totalCopies } =
      req.body;
const file = req.file;
let coverImage;

if (file) {
  // Cloudinary file upload
  const fileUrl = getDataUri(file);
  const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
  coverImage = cloudResponse.secure_url;
} else {
  // Default profile photo
  coverImage = "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg";
}

    if (!title || !ISBN || !author || !totalCopies||!publicationYear) {
      return res.status(400).json({
        message: "Something is Missing",
        success: false,
      });
    }
    const book = await Book.create({
      title,
      author,
      genre,
      ISBN,
      publicationYear,
      totalCopies,
      copiesAvailable:totalCopies,
      coverImage
    });

    return res.status(200).json({
      message: "Book Added Successfully",
      book,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateBook = async (req, res) => {
  try {
    const { title, author, genre, ISBN, totalCopies,publicationYear } = req.body;
    const file = req.file;
    let coverImage;

    // Upload new cover image to Cloudinary if provided
    if (file) {
      const fileUrl = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
      coverImage = cloudResponse.secure_url;
    }

    // Find the existing book to calculate the difference
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    // Calculate the difference in total copies and adjust copiesAvailable
    const totalCopiesDifference = totalCopies - book.totalCopies;
    const updatedCopiesAvailable = book.copiesAvailable + totalCopiesDifference;

    // Ensure copiesAvailable doesn't go below 0
    const updateData = {
      title,
      author,
      genre,
      ISBN,
      totalCopies,
      publicationYear,
      copiesAvailable: Math.max(0, updatedCopiesAvailable),
    };
    if (coverImage) updateData.coverImage = coverImage;

    // Update the book in the database
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true, // Return the updated document
      }
    );

    return res.status(200).json({
      message: "Updated Book Information Successfully",
      book: updatedBook,
      success: true,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    return res.status(500).json({
      message: "An error occurred while updating the book",
      success: false,
    });
  }
};


export const deleteBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findByIdAndDelete(bookId);
    if(!book){
       return res.status(400).json({
         message: "Book Not Found",
         success: false,
       });
    }
    if(book.copiesAvailable<book.totalCopies){
      return res.status(400).json({
        message: "Book has been borrowed",
        success: false,
      });
    }
    

    return res.status(200).json({
      message: `${book.title} Deleted Successfully`,
      book,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while deleting the book",
      success: false,
    });
  }
}

export const getAllStudents=async(req,res)=>{
  try {
    const students=await User.find({role:"student"});
    if (!students) {
      return res.status(400).json({
        message: "Students Not Found",
        success: false,
      });
    }
     return res.status(200).json({
       data:students,
       success: true,
     });
  } catch (error) {
     console.error("Error updating book:", error);
     return res.status(500).json({
       message: "An error occurred while fetching students",
       success: false,
     });
  }
}

export const deleteStudent = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }

    return res.status(200).json({
      message: `${user.fullname} Deleted Successfully`,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while deleting the student",
      success: false,
    });
  }
};

export const AdminDashboardStats=async (req, res) => {
  try {
    const totalStudents = await User.countDocuments({ role: "student" });
    const totalBooks = await Book.countDocuments({});
    const totalCopies = await Book.aggregate([
      { $group: { _id: null, total: { $sum: "$totalCopies" } } },
    ]);
   const users = await User.find({
     borrowedBooks: { $exists: true, $not: { $size: 0 } },
   });
   const borrowedBooks = users.reduce(
     (count, user) => count + (user.borrowedBooks?.length || 0),
     0
   );
    const overdueBooks = await User.countDocuments({
      "borrowedBooks.dueDate": { $lt: new Date() },
    });

    res.json({
      totalStudents,
      totalBooks,
      totalCopies: totalCopies[0]?.total || 0,
      borrowedBooks,
      overdueBooks,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching dashboard stats", error });
  }
};

// Get recent transactions
export const getRecentTransactions = async (req, res) => {
  try {
    // Fetch the 5 most recent transactions
    const transactions = await Transaction.find()
      .sort({ createdAt: -1 }) // Sort by the latest createdAt
      .limit(5) // Limit to 5 most recent transactions
      .populate("user", "fullname") // Populate user field with 'fullname' (or adjust as needed)
      .populate("book", "title") // Populate book field with 'title' (or adjust as needed)
      .exec();

    // Send the transactions data as a response
    res.json({
      success: true,
      data: transactions,
    });
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching recent transactions",
    });
  }
};


//Bulk Books add
// New route to handle bulk upload of books
export const addBooksInBulk = async (req, res) => {
  try {
    const { books } = req.body; // books should be an array of book objects
    if (!books || books.length === 0) {
      return res.status(400).json({
        message: "No books provided",
        success: false,
      });
    }

    // Process each book and upload
    const addedBooks = [];
    for (const book of books) {
      const { title, author, genre, ISBN, publicationYear, totalCopies } = book;
      const file = book.coverImage; // Assuming coverImage is passed as a URL or file

      let coverImage;
      if (file) {
        // Cloudinary file upload
        const fileUrl = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUrl.content);
        coverImage = cloudResponse.secure_url;
      } else {
        // Default cover image if not provided
        coverImage = "https://www.hachette.co.nz/graphics/CoverNotAvailable.jpg";
      }

      const newBook = await Book.create({
        title,
        author,
        genre,
        ISBN,
        publicationYear,
        totalCopies,
        copiesAvailable: totalCopies,
        coverImage
      });

      addedBooks.push(newBook);
    }

    return res.status(200).json({
      message: `${addedBooks.length} books added successfully`,
      books: addedBooks,
      success: true,
    });
  } catch (error) {
    console.error("Error adding books:", error);
    return res.status(500).json({
      message: "An error occurred while adding books",
      success: false,
    });
  }
};
