import { Book } from "../models/BookModel.js"
import { Transaction } from "../models/TransactionModel.js";
import { User } from "../models/UserModel.js";

export const borrowBook = async (req, res) => {
  try {
    const bookId = req.params.id;
    const userId = req.id;

    const book = await Book.findById(bookId).populate("");
    const user = await User.findById(userId);

    if (!book) {
      return res.status(400).json({
        message: "Book Not Found",
        success: false,
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "User Not Found",
        success: false,
      });
    }
    if(user.borrowedBooks.length>=10)  {
      return res.status(400).json({
        message: "You have already borrowed 10 books",
        success: false,
      });
    }

    if (book.copiesAvailable <= 0) {
      return res.status(400).json({
        message: "No copies of this book available",
        success: false,
      });
    }

    // Check if the user has already borrowed the book
    if (user.borrowedBooks.some((item) =>item.book && item.book.toString() === bookId)) {
      return res.status(400).json({
        message: "You have already borrowed this book",
        success: false,
      });
    }

    // Decrease the available copies of the book
    book.copiesAvailable -= 1;
    await book.save();

    // Create a new transaction
    const transaction = new Transaction({
      user: userId,
      book: bookId,
      borrowedDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // Due in 30 days
      status: "Borrowed",
    });
    await transaction.save();

    // Add the book and transaction to the user's borrowedBooks
  user.borrowedBooks.push({
    book: bookId,
    transactionId: transaction._id,
    borrowedDate: transaction.borrowedDate,
    dueDate: transaction.dueDate,
  });

    await user.save();

    return res.status(200).json({
      message: `${book.title} Book borrowed successfully!`,
      book: book.title,
      transactionId: transaction._id,
      dueDate: transaction.dueDate,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const returnBook = async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);

    if (!transaction) {
      return res.status(400).json({
        message: "Transaction not found",
        success: false,
      });
    }

        const user = await User.findById(transaction.user);
        if (!user) {
          return res.status(400).json({
            message: "User Not Found",
            success: false,
          });
        }

    const bookId = transaction.book;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(400).json({
        message: "Book Not Found",
        success: false,
      });
    }

    if (transaction.status === "Returned") {
      return res.status(400).json({
        message: "Book already returned",
        success: false,
      });
    }

    const dueDate = transaction.dueDate;
    const today = new Date();

    // Calculate fine if the book is overdue
    if (today > dueDate) {
     const overdueDays = Math.ceil((today - dueDate) / (24 * 60 * 60 * 1000));
     const fineAmount = overdueDays * 2; // Example fine rate: $2 per day
     user.fines += fineAmount;
    }
    await user.save();

    
    transaction.returnDate = today;
    transaction.status = "Returned";
    await transaction.save();

    // Increase available copies of the book
    book.copiesAvailable += 1;
    await book.save();


    // Remove the book from the user's borrowedBooks
    user.borrowedBooks.pull({ book: bookId });
    await user.save();

    return res.status(200).json({
      message: "Book returned successfully",
      returnDate: transaction.returnDate,
      fine: transaction.fine || 0,
      success:true
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


//get book by id
export const getBookById = async (req, res) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({
        message: "Book not found",
        success: false,
      });
    }

    return res.status(200).json({
      book,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//Get all books 
export const getAllBooks = async (req, res) => {
  try {
    // Fetch all books sorted by updatedAt in descending order
    const allBooks = await Book.find().sort({ createdAt: -1 });
    return res.status(200).json({
      data: allBooks,
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", success: false });
  }
};


