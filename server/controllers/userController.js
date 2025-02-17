// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs"; 
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import User, { IUser } from "../models/UserSchema";
// dotenv.config();

// const userController = {
//   register: asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const { name, email, password, mobile_number } = req.body;


//       if (!name || !email || !password || !mobile_number) {
//         res.status(400).json({ error: "All fields are required." });
//         return;
//       }

 
//       const userFound: IUser | null = await User.findOne({
//         $or: [{ email }, { mobile_number }],
//       });

//       if (userFound) {
//         res.status(400).json({ error: "User already exists." });
//         return;
//       }


//       const hashedPassword = await bcrypt.hash(password, 10);
 
//       const newUser: IUser = new User({
//         name,
//         email,
//         password: hashedPassword,
//         mobile_number,
//       });

//       await newUser.save();

//       const role = newUser.role
//       const id = newUser._id
//       const payload = {
//         id,
//         role,
//         name,
//         email

//     }
//       const token: string = jwt.sign(
//        payload,
//         process.env.JWT_SECRET as string,
//         { expiresIn: "2d" } 
//       );


//       res.cookie("userData", token, {
//         maxAge: 2 * 24 * 60 * 60 * 1000, 
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "strict",
//       });

  
//       res.status(201).json({
//         message: "User registration successful",
//         token
//       });
//     } catch (error) {
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }),



//  login : asyncHandler(async (req: Request, res: Response) => {
//   const { email, password } = req.body;


//   if (!email || !password) {
//     throw new Error("Please Provide Required Fields");
//   }


//   const user = await User.findOne({ email });
//   if (!user) {
//     throw new Error("Sorry... User Not Found");
//   }


//   const passwordCheck = await bcrypt.compare(password, user.password);
//   if (!passwordCheck) {
//     throw new Error("Password Is Incorrect");
//   }

  
//   const token = jwt.sign(
//     { userId: user.id , role:user.role},
//     process.env.JWT_SECRET!,
//     { expiresIn: '2h' }
//   )

//   res.cookie('token', token, {
//     maxAge: 2 * 24 * 60 * 60 * 1000, 
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: 'none', 
//   });

  
//   res.json({
//     message: 'Login Successful',
//     token,
//   });
// }),
// getOneUser : asyncHandler(async (req: Request, res: Response): Promise<void> => {
//   const userIdFromAuth = (req as any).user; // Adjust this based on how authentication is handled
//   if (!userIdFromAuth) {
//     res.status(401).json({ message: "Authentication failed" });
//     return;
//   }

//   const { userId } = req.params;
//   if (!userId) {
//     res.status(400).json({ message: "Please provide the ID of the user" });
//     return;
//   }

//   try {
//     const userFound = await User.findById(userId);
//     if (!userFound) {
//       res.status(404).json({ message: "User not found" });
//       return;
//     }

//     res.status(200).json({
//       message: "User found successfully",
//       user: userFound,
//     });
//   } catch (error) {
//     // next(error);
//     console.log(error) // Passes the error to the error-handling middleware
//   }
// })



// };

// export default userController;





const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const dotenv = require("dotenv")
const User = require("../models/UserSchema.js")
dotenv.config();

const userController = {
  register: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, mobile_number } = req.body;

      if (!name || !email || !password || !mobile_number) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      const userFound = await User.findOne({
        $or: [{ email }, { mobile_number }],
      });

      if (userFound) {
        res.status(400).json({ error: "User already exists." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        mobile_number,
      });

      await newUser.save();

      const role = newUser.role;
      const id = newUser._id;
      const payload = {
        id,
        role,
        name,
        email
      };

      const token = jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      res.cookie("userData", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000, 
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });

      res.status(201).json({
        message: "User registration successful",
        token
      });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please Provide Required Fields");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("Sorry... User Not Found");
    }

    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
      throw new Error("Password Is Incorrect");
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.cookie('token', token, {
      maxAge: 2 * 24 * 60 * 60 * 1000, 
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: 'none',
    });

    res.json({
      message: 'Login Successful',
      token,
    });
  }),

  getOneUser: asyncHandler(async (req, res) => {
    const userIdFromAuth = req.user; // Adjust this based on how authentication is handled
    if (!userIdFromAuth) {
      res.status(401).json({ message: "Authentication failed" });
      return;
    }

    const { userId } = req.params;
    if (!userId) {
      res.status(400).json({ message: "Please provide the ID of the user" });
      return;
    }

    try {
      const userFound = await User.findById(userId);
      if (!userFound) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({
        message: "User found successfully",
        user: userFound,
      });
    } catch (error) {
      console.log(error); // Passes the error to the error-handling middleware
    }
  })
};

module.exports = userController;
