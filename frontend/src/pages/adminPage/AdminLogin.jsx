import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { AiOutlineClose } from "react-icons/ai";
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import Cookies from "js-cookie";
import { useDispatch } from 'react-redux';
import { jwtDecode } from "jwt-decode";
import { loginAdmin } from '../../services/adminServices';
import { login } from '../../redux/adminSlice';


;

const AdminLogin = () => {
  const [notification, setNotification] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const { mutateAsync } = useMutation({
    mutationFn: loginAdmin,
    onError: (error) => {
      showNotification(error.response?.data?.error || "Login failed", "error");
    },
    onSuccess: (data) => {
      Cookies.set("AdminData", data?.token);
      const decoded = jwtDecode(data.token);
      dispatch(login({ admin: decoded, token: data.token }));
      navigate(`/admin/${decoded?.adminId}`);
      showNotification("Login successful", "success");
    },
  });

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleSubmit = async (values) => {
    await mutateAsync(values);
  };

  return (
    <div className="min-h-screen font-montserrat flex items-center justify-center bg-gray-100">
      <div className="grid grid-cols-1 w-full max-w-6xl p-4 bg-white">
        
        <div className="flex justify-center items-center">
          <section id="login">
            <h1 className='underline text-lg font-bold'>Admin Login</h1>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              <Form className="pt-6">
                <div className="grid mb-4">
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-1">Email:</label>
                  <div className="bg-slate-100 p-2 rounded-md">
                    <Field type="email" id="email" name="email" placeholder="Enter Email" className="w-full h-full outline-none bg-transparent" />
                  </div>
                  <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-1">Password:</label>
                  <div className="bg-slate-100 p-2 flex rounded-md">
                    <Field type={showPassword ? "text" : "password"} id="password" name="password" placeholder="Enter Password" className="w-full h-full outline-none bg-transparent" />
                    <div className="cursor-pointer ml-2 flex items-center" onClick={() => setShowPassword(prev => !prev)}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </div>
                  </div>
                  <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                  <Link to={'/forget-password'} className="w-fit ml-auto block hover:underline hover:text-cyan-500 mt-2">Forget password?</Link>
                </div>

                <button type="submit" className="bg-cyan-500 text-white px-5 py-2 w-full max-w-[150px] rounded-md hover:scale-105 transition-all mx-auto block">Login</button>
              </Form>
            </Formik>
            {notification && (
              <div className={`fixed  right-4 z-50 bottom-4  px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
                <span>{notification.message}</span>
                <button onClick={() => setNotification(null)} className="text-white ml-2">
                  <AiOutlineClose />
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
