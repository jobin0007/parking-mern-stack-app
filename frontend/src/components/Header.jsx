// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { AiOutlineMenu, AiOutlineClose ,  AiOutlineLogout,} from "react-icons/ai";
// import UserLogin from "../pages/userPage/UserLogin";
// import useLogout from "../hooks/useLogout";
// import FindMyVehicle from "../pages/userPage/FindMyVehicle";


// const Header = ({user,setUser}) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [showFindVehicle, setShowFindVehicle] = useState(false);

//   const logoutMutation = useLogout(setUser);

// const userfound = user

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const closeMenu = () => setMenuOpen(false);
    
//   return (
//     <div>
//       <header className=" text-black p-4 flex justify-between items-center ">
//         <h1 className="text-2xl font-bold">My Website</h1>

//         {/* Navigation for larger screens */}
//         <nav className="hidden md:flex space-x-4">
//           <Link to="/home" className="hover:underline">Home</Link>
//           <Link to="/services" className="hover:underline">Services</Link>
//           <Link to="/about" className="hover:underline">About</Link>
//         </nav>

//         {/* User Profile & Dropdown */}
//         <div className="relative">
//           {user ? (<div className="flex flex-row justify-between gap-3">
//             <button className="flex items-center gap-2 text-red-600 hover:text-red-800"
//            onClick={() => logoutMutation.mutate()} 
//           >
           
//             <AiOutlineLogout className="text-lg" /> Logout
//           </button>
//           <button onClick={() => setShowFindVehicle(true)} className="text-blue-600">Find my vehicle</button>

//             <p className="mr-2">Welcome, {user.name}</p>
//             </div>
            
//           ) : (
//             <FaUser className="text-xl cursor-pointer" onClick={toggleMenu} />
//           )}

//           {menuOpen && (
//             <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-md rounded-md py-2 z-50">
//               {/* Close Button Inside Dropdown */}
//               <button
//                 className="absolute top-2 right-2 text-gray-500 hover:text-black"
//                 onClick={closeMenu}
//               >
//                 <AiOutlineClose className="text-lg" />
//               </button>

//               <button onClick={() => { setIsLoginOpen(true); closeMenu(); }} className="block w-full text-left px-4 py-2 hover:bg-gray-200">
//                 Login
//               </button>

//               <Link to="/user/register">
//                 <button className="block w-full text-left px-4 py-2 hover:bg-gray-200">
//                   Register
//                 </button>
//               </Link>
//             </div>
//           )}
//         </div>

//         {/* Mobile Menu Button */}
//         <button className="md:hidden" onClick={toggleMenu}>
//           {menuOpen ? <AiOutlineClose className="text-xl" /> : <AiOutlineMenu className="text-xl" />}
//         </button>
//       </header>

//       {/* User Login Modal (outside dropdown) */}
//       <UserLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
//       {showFindVehicle && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded">
//             <FindMyVehicle />
//             <button onClick={() => setShowFindVehicle(false)} className="mt-4 bg-red-500 text-white p-2 rounded">
//               Close
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Header;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import UserLogin from "../pages/userPage/UserLogin";
import useLogout from "../hooks/useLogout";
import FindMyVehicle from "../pages/userPage/FindMyVehicle";
import logo from "../assets/parking-area.jpg"; // Replace with actual image path

const Header = ({ user, setUser }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [showFindVehicle, setShowFindVehicle] = useState(false);


  const logoutMutation = useLogout(setUser);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="flex justify-between items-center font-montserrat  p-4 bg-white shadow-md w-full">
  
      <div className="flex items-center gap-2">
        <img src={logo} alt="SpotFinder Logo" className="w-20 h-20" />
        <h1 className="hidden lg:block sm:text-lg md:text-xl lg:text-2xl font-bold">SpotFinder</h1>
      </div>
      
      
      <div className="ml-auto flex items-center gap-4">
        {user && <p className="text-gray-700 text-xs sm:text-xs md:text-sm lg:text-lg">Welcome, {user.name}</p>}
        
    
        <button onClick={toggleMenu}>
          {menuOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
        </button>
      </div>
      

      {menuOpen && (
        <div className="fixed top-0 left-0 w-64 h-full bg-gray-900 text-white shadow-lg p-6 flex flex-col items-end z-50">
          <button onClick={closeMenu} className="text-2xl text-white">
            <AiOutlineClose />
          </button>
          {!user && (
            <>
              <button onClick={() => { setIsLoginOpen(true); closeMenu(); }}
                className="block text-lg text-white py-2 hover:underline">Login</button>
              <Link to="/user/register" className="block text-lg text-white py-2 hover:underline">Register</Link>
            </>
          )}
          <Link to="/home" className="block text-lg  py-2 hover:underline">Home</Link>
          <Link to="/services" className="block text-lg  py-2 hover:underline">Services</Link>
          <Link to="/about" className="block text-lg  py-2 hover:underline">About</Link>
          {user && (
            <>
            
                 <button onClick={() => setShowFindVehicle(true)} className="block text-lg  py-2 hover:underline">
               Find My Vehicle
            </button>
              <button onClick={() => logoutMutation.mutate()} className="flex items-center gap-2 py-2 ">
                <AiOutlineLogout className="text-lg" /> Logout
              </button>
            
            </>
          )}
        </div>
      )}

      {showFindVehicle && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-900 border border-white p-6 rounded">
            <FindMyVehicle />
            <button onClick={() => setShowFindVehicle(false)}
              className="mt-4 bg-red-500 text-white p-2 rounded">Close</button>
          </div>
        </div>
      )}
      
   
      <UserLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
    </header>
  );
};

export default Header;

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { AiOutlineMenu, AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
// import UserLogin from "../pages/userPage/UserLogin";
// import useLogout from "../hooks/useLogout";
// import FindMyVehicle from "../pages/userPage/FindMyVehicle";
// import logo from "../assets/parking-area.jpg"; // Replace with actual image path

// const Header = ({ user, setUser }) => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isLoginOpen, setIsLoginOpen] = useState(false);
//   const [showFindVehicle, setShowFindVehicle] = useState(false);

//   const logoutMutation = useLogout(setUser);

//   const toggleMenu = () => setMenuOpen(!menuOpen);
//   const closeMenu = () => setMenuOpen(false);

//   return (
//     <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
//       {/* App Name and Logo */}
//       <div className="flex items-center gap-2">
//         <img src={logo} alt="SpotFinder Logo" className="w-10 h-10" />
//         <h1 className="text-2xl font-bold">SpotFinder</h1>
//       </div>
      
//       {/* Toggle Button for Mobile */}
//       <button className="md:hidden" onClick={toggleMenu}>
//         {menuOpen ? <AiOutlineClose className="text-2xl" /> : <AiOutlineMenu className="text-2xl" />}
//       </button>
      
//       {/* Desktop Navigation */}
//       <nav className="hidden md:flex gap-6">
//         {user ? (
//           <div className="flex items-center gap-4">
//             <button onClick={() => setShowFindVehicle(true)} className="text-blue-600 hover:underline">
//               Find My Vehicle
//             </button>
//             <button className="flex items-center gap-2 text-red-600 hover:text-red-800"
//               onClick={() => logoutMutation.mutate()}>
//               <AiOutlineLogout className="text-lg" /> Logout
//             </button>
//             <p className="text-gray-700">Welcome, {user.name}</p>
//           </div>
//         ) : (
//           <FaUser className="text-xl cursor-pointer" onClick={toggleMenu} />
//         )}
//       </nav>
      
//       {/* Mobile Sidebar Menu */}
//       {menuOpen && (
//         <div className="fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-6 flex flex-col items-end z-50">
//           <button onClick={closeMenu} className="text-2xl text-gray-600">
//             <AiOutlineClose />
//           </button>
//           {!user && (
//             <>
//               <button onClick={() => { setIsLoginOpen(true); closeMenu(); }}
//                 className="block text-lg text-gray-700 py-2 hover:underline">Login</button>
//               <Link to="/user/register" className="block text-lg text-gray-700 py-2 hover:underline">Register</Link>
//             </>
//           )}
//           <Link to="/home" className="block text-lg text-gray-700 py-2 hover:underline">Home</Link>
//           <Link to="/services" className="block text-lg text-gray-700 py-2 hover:underline">Services</Link>
//           <Link to="/about" className="block text-lg text-gray-700 py-2 hover:underline">About</Link>
//         </div>
//       )}
      
//       {/* User Login Modal */}
//       <UserLogin isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />

//       {/* Find My Vehicle Modal */}
//       {showFindVehicle && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//           <div className="bg-white p-6 rounded">
//             <FindMyVehicle />
//             <button onClick={() => setShowFindVehicle(false)}
//               className="mt-4 bg-red-500 text-white p-2 rounded">Close</button>
//           </div>
//         </div>
//       )}
//     </header>
//   );
// };

// export default Header; 