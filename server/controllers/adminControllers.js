// import { Request, Response } from "express";
// import asyncHandler from "express-async-handler";
// import bcrypt from "bcryptjs"; 
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import Admin, { IAdmin } from "../models/AdminSchema";
// import { AuthRequest } from "../middleware/authMiddleware";


// dotenv.config();

// const adminController = {
//   register: asyncHandler(async (req: Request, res: Response) => {
//     try {
//       const { name, email, password, mobile_number } = req.body;


//       if (!name || !email || !password || !mobile_number) {
//         res.status(400).json({ error: "All fields are required." });
//         return;
//       }

 
//       const adminFound: IAdmin | null = await Admin.findOne({
//         $or: [{ email }, { mobile_number }],
//       });

//       if (adminFound) {
//         res.status(400).json({ error: "admin already exists." });
//         return;
//       }


//       const hashedPassword = await bcrypt.hash(password, 10);

//       const newAdmin: IAdmin = new Admin({
//         name,
//         email,
//         password: hashedPassword,
//         mobile_number,
//       });

//       await newAdmin.save();
//       const role = newAdmin.role;
//       const payload = {
//         role,
//         name,
//         email,
//       };
//       const token = jwt.sign(payload, process.env.JWT_SECRET as string,{ expiresIn: "2d" } );

     


//       res.cookie("adminData", token, {
//         maxAge: 2 * 24 * 60 * 60 * 1000, 
//         httpOnly: true,
//         secure: process.env.NODE_ENV === "production",
//         sameSite: "none",
//       });

  
//       res.status(201).json({
//         message: "Admin registration successful",
//         token
//       });
//     } catch (error) {
//       console.error("Error in admin registration:", error);
//       res.status(500).json({ error: "Internal server error" });
//     }
//   }),



//  login : asyncHandler(async (req: Request, res: Response) => {
//   const { email, password } = req.body;


//   if (!email || !password) {
//     throw new Error("Please Provide Required Fields");
//   }


//   const admin = await Admin.findOne({ email });
//   if (!admin) {
//     throw new Error("Sorry... admin Not Found");
//   }


//   const passwordCheck = await bcrypt.compare(password, admin.password);
//   if (!passwordCheck) {
//     throw new Error("Password Is Incorrect");
//   }

  
//   const token = jwt.sign(
//     { adminId: admin.id , role: admin.role  },
//     process.env.JWT_SECRET!,
//     { expiresIn: '2h' }
//   )


//   res.cookie( 'token',token, {
//     maxAge: 2 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//     secure: false, 
//     sameSite: 'none',
//   });
// const decoded = jwt.decode(token)
//   res.json({
//     message: 'Login Successful',
//     token,
//     decoded
//   });
// }),
// getOneAdmin : asyncHandler( async (req: AuthRequest, res: Response): Promise<void> => {
//   try {
//     const id = req.admin; 
//     if (!id) {
//       res.status(401).json({ error: "Authentication failed" });
//       return;
//     }

//     const { adminId } = req.params;
//     if (!adminId) {
//       res.status(400).json({ error: "Please provide the ID of the admin" });
//       return;
//     }

//     const adminFound: IAdmin | null = await Admin.findById(adminId);
//     if (!adminFound) {
//       res.status(404).json({ error: "Admin not found" });
//       return;
//     }

//     res.json({
//       message: "Admin found successfully",
//       admin: adminFound,
//     });
//   } catch (error) {
//     console.error("Error fetching admin:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// })




// };

// export default adminController;


const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const Admin = require("../models/AdminSchema.js");

dotenv.config();

const adminController = {
  register: asyncHandler(async (req, res) => {
    try {
      const { name, email, password, mobile_number } = req.body;

      if (!name || !email || !password || !mobile_number) {
        res.status(400).json({ error: "All fields are required." });
        return;
      }

      const adminFound = await Admin.findOne({
        $or: [{ email }, { mobile_number }],
      });

      if (adminFound) {
        res.status(400).json({ error: "Admin already exists." });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        name,
        email,
        password: hashedPassword,
        mobile_number,
      });

      await newAdmin.save();
      const role = newAdmin.role;
      const payload = { role, name, email };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });

      res.cookie("adminData", token, {
        maxAge: 2 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
      });

      res.status(201).json({
        message: "Admin registration successful",
        token,
      });
    } catch (error) {
      console.error("Error in admin registration:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }),

  login: asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("Please provide required fields");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new Error("Sorry... admin not found");
    }

    const passwordCheck = await bcrypt.compare(password, admin.password);
    if (!passwordCheck) {
      throw new Error("Password is incorrect");
    }

    const token = jwt.sign(
      { adminId: admin.id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.cookie("token", token, {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: false,
      sameSite: "none",
    });

    const decoded = jwt.decode(token);
    res.json({
      message: "Login successful",
      token,
      decoded,
    });
  }),

  getOneAdmin: asyncHandler(async (req, res) => {
    try {
      const id = req.admin;
      if (!id) {
        res.status(401).json({ error: "Authentication failed" });
        return;
      }

      const { adminId } = req.params;
      if (!adminId) {
        res.status(400).json({ error: "Please provide the ID of the admin" });
        return;
      }

      const adminFound = await Admin.findById(adminId);
      if (!adminFound) {
        res.status(404).json({ error: "Admin not found" });
        return;
      }

      res.json({
        message: "Admin found successfully",
        admin: adminFound,
      });
    } catch (error) {
      console.error("Error fetching admin:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }),
};

module.exports = adminController;



