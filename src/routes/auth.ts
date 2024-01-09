// login endpoint

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post("/login", [

    // check validation 
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({ min: 6 }),
], async (req: Request, res: Response) => {
    
    // validation 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    };


    // get form body 
    const { email, password } = req.body;

    // fetch user 
    try {
        const user = await User.findOne({ email });

        // check email 
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // check password 
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }


        // http cookie 
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, { expiresIn: "1d" });

        res.cookie("auth_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 86400000,
        });

        // when everything ok 
        res.status(200).json({ userId: user._id });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }

});

router.get("/validation-token", varifyToken, (req: Request, res: Response) => {
    res.status(200).send({ userId: req.userId });
});

export default router;