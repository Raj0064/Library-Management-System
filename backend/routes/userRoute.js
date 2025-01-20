import express from 'express';
import { getAllBorrowedBooks, getUserbyId, Login, logOut, register } from '../controllers/userController.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router=express.Router();

router.route("/register").post(register);
router.route("/login").post(Login);
router.route("/logout").get(isAuthenticated, logOut);
router.route("/getBorrowedBooks").get(isAuthenticated, getAllBorrowedBooks);
router.route("/getUser/:id").get(isAuthenticated,getUserbyId);


export default router;