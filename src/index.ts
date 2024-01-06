import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import userRoutes from './routes/users'
import authRoutes from './routes/auth'

mongoose.connect(process.env.MONGODB_CONNECTION as string)

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


// user login route 
app.use("/api/auth", authRoutes)

// user register route 
app.use("/api/users", userRoutes)

app.listen(7000, () => {
    console.log("server is running on localhost: 7000")
})