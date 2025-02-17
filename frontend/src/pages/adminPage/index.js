import React, { useState } from "react";
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineLogout,
} from "react-icons/ai";

import { MdCreateNewFolder, MdDashboard } from "react-icons/md";
import { Link, Outlet, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getOneAdminAPI } from "../../services/adminServices";
import useLogout from "../../hooks/useLogout";

function AdminDashBoard() {
  const { id: adminId } = useParams();
  const logoutMutation = useLogout()

  const [notification, setNotification] = useState(null);
  
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification(null);
    }, 3000);
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["user", adminId],
    queryFn: () => getOneAdminAPI(adminId),
  });

  const adminFound = data?.admin || {};

  return (
    <div className="min-h-screen font-montserrat flex flex-col bg-gray-100">
      <div className="flex justify-between items-center bg-white p-4 shadow-md">
        <div className="flex items-center gap-4">
          <AiOutlineHome className="text-lg" />
          <Link to={'/'}>      
              <span>Home</span>
           </Link>
          <button className="flex items-center gap-2 text-red-600 hover:text-red-800"
           onClick={() => logoutMutation.mutate()} 
          >
            <AiOutlineLogout className="text-lg" /> Logout
          </button>
          <div className="flex items-center gap-2">
            <AiOutlineUser className="text-lg" />
            <span>{adminFound?.name || "Loading..."}</span>
          </div>
        </div>
      </div>

      <div className="flex">
        <aside className="bg-white w-64 p-4 shadow-lg h-screen">
          <nav className="mt-10 space-y-4">
            <Link
              to={`/admin/${adminId}/update-spot`}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
              <MdCreateNewFolder /> Update Spot Availability
            </Link>
            <Link
              to={`/admin/${adminId}/create-spot`}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
              <MdCreateNewFolder /> Create Parking Spot
            </Link>
            {/* <Link
              to={`/admin/${adminId}/get-All-tour-operators`}
              className="flex items-center gap-2 hover:text-indigo-600"
            >
              <MdCreateNewFolder /> Manage Tour-operators
            </Link> */}
          </nav>
        </aside>
        <main className="flex-grow p-6">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold py-6 text-center bg-white shadow-md rounded-lg">
           Admin Dashboard
          </h1>
          <div className="bg-white shadow-md rounded-lg p-4">
            <Outlet /> 
          </div>
          {isLoading ? (
            <p className="text-center text-gray-700">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-600">Failed to load data.</p>
          ) : (
            <section className="bg-white shadow-md rounded-lg p-4"></section>
          )}
        </main>
      </div>

      <footer className="bg-white py-4 text-center shadow-md">
        <p className="text-gray-600">© 2025 Admin Dashboard</p>
      </footer>

      {notification && (
        <div className={`fixed right-4 z-50 bottom-4 px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 
          ${notification.type === "success" ? "bg-green-500" : "bg-red-500"}`}>
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white ml-2">
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
}

export default AdminDashBoard;
