// import React, { useState } from "react";
// import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import { useMutation } from "@tanstack/react-query";
// import Cookies from "js-cookie";
// import { useDispatch } from "react-redux";
// import { jwtDecode } from "jwt-decode";
// import { loginAPI } from "../../services/userServices";
// import { login } from "../../redux/userSlice";
// import {AiOutlineClose} from "react-icons/ai";

// const UserLogin = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [notification, setNotification] = useState(null);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  
//   const showNotification = (message, type) => {
//     setNotification({ message, type });
  
//     setTimeout(() => {
//       setNotification(null);
//     }, 3000); 
//   };

//   const { mutateAsync } = useMutation({
//     mutationFn: loginAPI,
//     onError: (error) => {
//       showNotification(error.response?.data?.error || "An Unexpected Error Occurred", "error"  )
      
//     },
//     onSuccess: (data) => {
//       Cookies.set("UserData", data?.token);
//       const decoded = jwtDecode(data.token);
//       dispatch(login({ user: decoded, token: data.token }));
//       navigate(`/user/${decoded?.userId}`);
//     },
//   });

//   const validationSchema = Yup.object({
//     email: Yup.string().email("Invalid email address").required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   const handleSubmit = async (values) => {
//     await mutateAsync(values);
//   };

//   return (
//     <section className="flex justify-center items-center mt-6 mb-9 bg-gradient-to-r  px-4">
//       <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-black">
//         <h2 className="text-sm sm:text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
//         <Formik
//           initialValues={{ email: "", password: "" }}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           <Form className="space-y-5">
//             {/* Email Field */}
//             <div className="relative">
//               <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <Field
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 className="w-full pl-10 text-xs sm:text-xs md:text-sm lg:text-lg pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

         
//             <div className="relative">
//               <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//               <Field
//                 type={showPassword ? "text" : "password"}
//                 name="password"
//                 placeholder="Password"
//                 className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs sm:text-xs md:text-sm lg:text-lg"
//               />
//               <div
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
//                 onClick={() => setShowPassword((prev) => !prev)}
//               >
//                 {showPassword ? <FaEyeSlash /> : <FaEye />}
//               </div>
//               <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
//             </div>

//             {/* <Link
//               to="/forget-password"
//               className="block text-right text-sm text-blue-600 hover:underline"
//             >
//               Forgot password?
//             </Link> */}

//             {/* Submit Button */}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r bg-white border border-black text-black py-2 px-4 rounded-md font-medium hover:bg-gray-600 hover:text-white hover:border-none transition duration-300
//               text-xs sm:text-xs md:text-sm lg:text-lg"
//             >
//               Login
//             </button>
//           </Form>
//         </Formik>

//         <p className="text-center text-xs sm:text-xs md:text-sm lg:text-lg text-gray-600 mt-5">
//           Don’t have an account?{' '}
//           <Link to="/user/register" className="text-blue-600 text-xs sm:text-xs md:text-sm lg:text-lg hover:underline">
//             Create New Account
//           </Link>
//         </p>
//       </div>
//       {notification && (
//         <div className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
//           ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
//           <span>{notification.message}</span>
//           <button onClick={() => setNotification(null)} className="text-white ml-2">
//             <AiOutlineClose />
//           </button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default UserLogin;


import React, { useState } from "react";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { loginAPI } from "../../services/userServices";
import { AiOutlineClose } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../redux/adminSlice";

const UserLogin = ({ isOpen,onClose }) => {

  const [showPassword, setShowPassword] = useState(false);
  const [notification, setNotification] = useState(null);
    const navigate = useNavigate()
  const dispatch = useDispatch();

  const showNotification = (message, type) => {
    setNotification({ message, type });

    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginAPI,
    onError: (error) => {
      showNotification(error.response?.data?.error || "An Unexpected Error Occurred", "error");
    },
    onSuccess: (data) => {
      Cookies.set("UserData", data?.token);
      const decoded = jwtDecode(data.token);
      dispatch(login({ user: decoded, token: data.token }));
      showNotification("Login Successful!", "success");
      setTimeout(onClose, 1000); 
      navigate(`/home/${decoded?.userId}`);
    },
  });
  if (!isOpen) return null; 
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values) => {
    await mutateAsync(values);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 font-montserrat bg-black bg-opacity-50 flex justify-center items-center p-8 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: -50, scale: 0.9 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -50, scale: 0.9 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl border border-black relative"
            onClick={(e) => e.stopPropagation()} 
          >
           
            <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-black">
              <AiOutlineClose size={24} />
            </button>

       
          

            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center text-gray-800 mb-6">
              Welcome Back
            </h2>

            <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
              <Form className="space-y-5">
               
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Field
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

             
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                </div>

              
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r bg-white border border-black text-black py-2 px-4 rounded-md font-medium hover:bg-gray-600 hover:text-white hover:border-none transition duration-300"
                >
                  Login
                </button>
              </Form>
            </Formik>

            <p className="text-center text-gray-600 mt-5">
              Don’t have an account?{" "}
              <Link to={'/user/register'}>
              <span className="text-blue-600 cursor-pointer hover:underline" onClick={onClose}>
                Create New Account
              </span>
              </Link>
            </p>
          </motion.div>

        </motion.div>
      )}
        <AnimatePresence>
              {notification && (
                <motion.div
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
                    ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}
                >
                  <span>{notification.message}</span>
                  <button onClick={() => setNotification(null)} className="text-white ml-2">
                    <AiOutlineClose />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
    </AnimatePresence>
  );
};

export default UserLogin;

