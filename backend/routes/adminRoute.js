import express from 'express';
import { addBook, addBooksInBulk, AdminDashboardStats, deleteBook, deleteStudent, getAllStudents, getRecentTransactions, updateBook } from '../controllers/adminController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';
const router=express.Router();

router.route("/addBook").post(isAuthenticated,singleUpload,addBook);
router.route("/updateBook/:id").put(isAuthenticated,singleUpload,updateBook);
router.route("/deleteBook/:id").delete(isAuthenticated, deleteBook);
router.route("/getAllStudents").get(isAuthenticated, getAllStudents);
router.route("/deleteStudent/:id").delete(isAuthenticated, deleteStudent);
router.route("/dashboard-stats").get(isAuthenticated, AdminDashboardStats);
router.route("/recent-transactions").get(isAuthenticated,getRecentTransactions);


router.route("/addbooksinbulk").post(addBooksInBulk);

export default router;