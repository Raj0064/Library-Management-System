
import { Book } from "../models/BookModel.js";
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, genre, ISBN, publicationDate, totalCopies } =
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

    if (!title || !ISBN || !author || !totalCopies) {
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
      publicationDate,
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
    const { title, author, genre, ISBN, totalCopies,publicationDate } = req.body;
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
      publicationDate,
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

    return res.status(200).json({
      message: `${book.title} Deleted Successfully`,
      book,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
}



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
      const { title, author, genre, ISBN, publicationDate, totalCopies } = book;
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
        publicationDate,
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
