// login endpoint

import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import User from "../models/user";
import bcrypt from "bcryptjs";

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
        const 

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Something went wrong" });
    }

});

