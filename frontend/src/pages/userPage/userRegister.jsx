import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { register } from "../../redux/userSlice";
import {AiOutlineClose} from "react-icons/ai";
import { registerAPI } from "../../services/userServices";

const UserRegister = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [notification, setNotification] = useState(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
  
    setTimeout(() => {
      setNotification(null);
    }, 3000); 
  };
  const { mutateAsync } = useMutation({
    mutationFn: registerAPI,
    onError: (error) => {
   
        showNotification(error.response?.data?.error || "An unexpected error occurred.", "error"  )
       
    
    },
    onSuccess: (data) => {
      if (data?.token) {
        Cookies.set("UserData", data.token);
        const decoded = jwtDecode(data.token);
        dispatch(register({ user: decoded, token: data.token }));
        navigate("/user/login");
      } else {
        showNotification("Registration failed. Please try again", "error"  )
      
      }
    },
  });

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    mobile_number: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
    address: Yup.string().required("Address is required"),
    role: Yup.string()
      .oneOf(["user", "tour-operator", "admin"], "Invalid role")
      .required("Role is required"),
  });

  const handleSubmit = async (values) => {
    setNotification(null)
    try {
      await mutateAsync(values);
    } catch (error) {
     
    }
  };

  return (
    <div className="flex justify-center font-montserrat items-center min-h-screen bg-gradient-to-r  p-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-black">
        <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center text-gray-800 ">
          Create an Account
        </h2>
     
        <Formik
          initialValues={{
            name: "",
            email: "",
            mobile_number: "",
            address: "",
            password: "",
            role: "user",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="space-y-5">
              {/* Name Field */}
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Field
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Full Name"
                  className="w-full text-xs sm:text-xs md:text-sm lg:text-lg pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Email Field */}
              <div className="relative">
                <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-full pl-10 text-xs sm:text-xs md:text-sm lg:text-lg pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Mobile Number Field */}
              <div className="relative">
                <FaPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Field
                  type="text"
                  id="mobile_number"
                  name="mobile_number"
                  placeholder="Mobile Number"
                  className="w-full text-xs sm:text-xs md:text-sm lg:text-lg pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="mobile_number" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Address Field */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Field
                  type="text"
                  id="address"
                  name="address"
                  placeholder="Address"
                  className="w-full text-xs sm:text-xs md:text-sm lg:text-lg pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Password Field */}
              <div className="relative">
                <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Field
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="w-full text-xs sm:text-xs md:text-sm lg:text-lg pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full text-xs sm:text-xs md:text-sm lg:text-lg bg-gradient-to-r bg-white text-black border border-black py-2 px-4 rounded-md font-medium hover:bg-gray-500 hover:border-none hover:text-white transition duration-300"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
      {notification && (
        <div className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white ml-2">
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default UserRegister;
