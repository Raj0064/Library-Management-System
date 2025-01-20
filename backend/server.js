import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import bookRoute from "./routes/bookRoute.js";
import cors from "cors";
import connectDB from "./utils/db.js";
import path from "path";

dotenv.config();
const app = express();

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const _dirname = path.resolve();

const corsOption = {
  origin: "https://library-management-system-oo5a-892t8i5ev.vercel.app", // Specify the client origin
  credentials: true, // Include credentials if necessary
};
app.use(cors(corsOption));

//api's
app.use("/api/v1/user", userRoute);
app.use("/api/v1/admin", adminRoute);
app.use("/api/v1/book", bookRoute);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req, res) =>
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  connectDB();
  console.log(`App is running on port ${PORT}`);
});
