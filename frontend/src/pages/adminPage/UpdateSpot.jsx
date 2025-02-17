import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { deleteParkingSpotAPI, getAllParkingSpotsAPI, updateParkingSpotAvailabilityAPI } from "../../services/adminServices";

const UpdateSpot = () => {
  const [notification, setNotification] = useState(null);
  
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3s
  };

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["parkingSpots"],
    queryFn: getAllParkingSpotsAPI,
  });

  const updateMutation = useMutation({
    mutationFn: ({ spotId, isAvailable }) => updateParkingSpotAvailabilityAPI(spotId, isAvailable),
    onSuccess: (data) => {
      showNotification(data.message, "success");
      refetch();
    },
    onError: (error) => {
      showNotification(error.response?.data?.message || "Error updating availability.", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteParkingSpotAPI,
    onSuccess: (data) => {
      showNotification(data.message, "success");
      refetch();
    },
    onError: (error) => {
      showNotification(error.response?.data?.message || "Error deleting spot.", "error");
    },
  });

  if (isLoading) return <p>Loading parking spots...</p>;
  if (isError) return <p>Error fetching parking spots.</p>;

  return (
    <div className="max-w-6xl font-montserrat mx-auto p-4 sm:p-6 bg-white shadow-lg rounded-md">
     {notification && (
  <div
    className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white shadow-lg z-50 
      transition-opacity duration-300 ${
        notification.type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
  >
    {notification.message}
  </div>
)}

      <h2 className="text-2xl font-bold mb-4 text-center">Manage Parking Spots</h2>
      {data?.spots?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.spots.map((spot) => (
            <div key={spot._id} className="p-4 border rounded shadow-sm bg-gray-100">
              <p className="text-lg font-semibold">{spot.location.address}, {spot.location.city}</p>
              <p className="text-sm">Vehicle Type: {spot.vehicleType}</p>
              <p className="text-sm">First Hour: ${spot.rate.firstHour} | Additional Hour: ${spot.rate.additionalHour}</p>
              <p className="text-sm">
                Status: <span className={spot.isAvailable ? "text-green-500" : "text-red-500"}>{spot.isAvailable ? "Available" : "Not Available"}</span>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 gap-2">
                <button
                  onClick={() => updateMutation.mutate({ spotId: spot._id, isAvailable: !spot.isAvailable })}
                  className={`px-4 py-2 rounded text-white w-full sm:w-auto ${spot.isAvailable ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
                >
                  {spot.isAvailable ? "Mark as Unavailable" : "Mark as Available"}
                </button>

                <button
                  onClick={() => deleteMutation.mutate(spot._id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 w-full sm:w-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No parking spots found.</p>
      )}
    </div>
  );
};

export default UpdateSpot;
