import express from "express";
import { borrowBook, getAllBooks, getBookById, returnBook } from "../controllers/bookController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();

router.route("/borrow/:id").post(isAuthenticated,borrowBook);
router.route("/return/:id").post(isAuthenticated,returnBook);
router.route("/get/:id").get(getBookById);
router.route("/allbooks").get(getAllBooks);
export default router;
