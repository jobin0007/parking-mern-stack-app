// import React, { useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { getAvailableParkingSpotsAPI } from "../../services/parkingSpotServices";

// const AvailableSpots = () => {
//   const [location, setLocation] = useState("");
//   const [vehicleType, setVehicleType] = useState("");

//   const { data, isLoading, isError, error, refetch } = useQuery({
//     queryKey: ["availableParkingSpots", location, vehicleType],
//     queryFn: () => getAvailableParkingSpotsAPI(location, vehicleType),
//     enabled: false, // Prevent automatic execution
//   });

//   const handleSearch = () => {
//     if (location && vehicleType) {
//       refetch();
//     }
//   };

//   return (
//     <div className="max-w-4xl font-montserrat mx-auto p-6 bg-white shadow-lg rounded-md">
//       <h2 className="text-2xl font-bold mb-4">Find Available Parking Spots</h2>

//       {/* Input Fields */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//         <input
//           type="text"
//           placeholder="Enter location"
//           value={location}
//           onChange={(e) => setLocation(e.target.value)}
//           className="p-2 border rounded w-full"
//         />
//         <select
//           value={vehicleType}
//           onChange={(e) => setVehicleType(e.target.value)}
//           className="p-2 border rounded w-full"
//         >
//           <option value="">Select Vehicle Type</option>
//           <option value="car">Car</option>
//           <option value="bike">Bike</option>
//         </select>
//       </div>

//       {/* Search Button */}
//       <button
//         onClick={handleSearch}
//         className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded"
//       >
//         Search
//       </button>

//       {/* Error Message */}
//       {isError && <p className="text-red-500 mt-2">{error?.message}</p>}

//       {/* Loading State */}
//       {isLoading && <p className="mt-4">Loading available parking spots...</p>}

//       {/* Parking Spot List */}
//       {data && (
//         <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//           {data.map((spot) => (
//             <li key={spot._id} className="p-4 border rounded bg-gray-100">
//               <p className="font-semibold">
//                 {spot.location.address}, {spot.location.city}
//               </p>
//               <p>Vehicle Type: {spot.vehicleType}</p>
//               <p>
//                 First Hour: ${spot.rate.firstHour} | Additional Hour: $
//                 {spot.rate.additionalHour}
//               </p>
//               <p className="text-green-500">Available</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default AvailableSpots;
