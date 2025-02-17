import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import {
  getAvailableParkingSpotsAPI,
  parkVehicleAPI,
} from "./services/parkingSpotServices";
import { getOneUserAPI } from "./services/userServices";
import SubscriptionSection from "./components/Subscription";

const Home = ({ setUser }) => {
  const [location, setLocation] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState(""); 
  const [selectedSpotId, setSelectedSpotId] = useState(null); 
  const { id: userId } = useParams();
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };


  const { data } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getOneUserAPI(userId),
    onError: (err) => showNotification(err?.response?.data?.error, "error"),
  });

  const user = data?.user;

  
  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  
  const {
    data: allSpots,
    isLoading: isSpotsLoading,
    isError: isSpotsError,
    error: spotsError,
    refetch,
  } = useQuery({
    queryKey: ["availableParkingSpots", location, vehicleType],
    queryFn: () => getAvailableParkingSpotsAPI(location, vehicleType),
  });

  const handleSearch = () => {
    refetch();
  };

 
  const parkMutation = useMutation({
    mutationFn: ({ parkingSpotId, vehicleNumber }) =>
      parkVehicleAPI(parkingSpotId, vehicleNumber),
    onSuccess: (data) => {
      showNotification(data.message, "success");
      setVehicleNumber(""); 
      setSelectedSpotId(null);
      refetch();
    },
    onError: (err) => {
      showNotification(
        err.response?.data?.message || "Parking failed",
        "error"
      );
    },
  });

  
  const handleParkClick = (spotId) => {
    setSelectedSpotId(spotId);
  };


  const handleConfirmParking = () => {
    if (!vehicleNumber) {
      showNotification("Please enter a vehicle number", "error");
      return;
    }
    parkMutation.mutate({ parkingSpotId: selectedSpotId, vehicleNumber });
  };

  return (
    <div className="w-full mx-auto font-montserrat bg-gray-900 text-white shadow-md">
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-3 text-center">
          Find Parking Spots
        </h2>

       
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-3 sm:grid-cols-3 gap-3 mx-auto items-center justify-center text-center">
            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="p-2 border text-xs sm:text-xs md:text-sm lg:text-sm rounded w-full bg-gray-900"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              className="p-2 border rounded text-xs sm:text-xs md:text-sm lg:text-sm w-full bg-gray-900"
            >
              <option value="">Vehicle Type</option>
              <option value="car">Car</option>
              <option value="bike">Bike</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-gray-900 text-xs sm:text-xs md:text-sm lg:text-sm hover:bg-black text-white p-2 rounded w-full border border-white sm:w-auto"
            >
              Search
            </button>
          </div>
        </div>

     
        {isSpotsError && (
          <p className="text-red-500 text-center mt-2">{spotsError?.message}</p>
        )}

      
        {isSpotsLoading && <p className="mt-3 text-center">Loading spots...</p>}

      
        <ul className="grid grid-cols-2 text-xs sm:text-xs font-montserrat md:text-sm lg:text-sm md:grid-cols-3 gap-3 mt-4 bg-gray-900">
  {allSpots?.map((spot) => (
    <li key={spot._id} className="p-3 border rounded bg-gray-900 flex flex-col justify-between h-40">
      <div>
        <p className="font-semibold">
          {spot.location.address}, {spot.location.city}
        </p>
        <p>Type: {spot.vehicleType}</p>
        <p>
          First Hour: ${spot.rate.firstHour} | Additional: ${spot.rate.additionalHour}
        </p>
        <p className="text-green-500">Available</p>
      </div>
      
      
      <button
        onClick={() => handleParkClick(spot._id)}
        className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-full text-center mt-auto"
      >
        Park Here
      </button>
    </li>
  ))}
</ul>


        {selectedSpotId && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
            <div className="bg-gray-900 border border-white  p-5 rounded-lg shadow-lg w-96">
              <h3 className="text-lg font-semibold  bg-gray-900 mb-3 text-center">
                Enter Vehicle Number
              </h3>
              <input
                type="text"
                placeholder="Vehicle Number"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                className="p-2  bg-gray-900 border rounded w-full"
              />
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => setSelectedSpotId(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white p-2 rounded w-1/2 mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmParking}
                  className="bg-green-600 hover:bg-green-700 text-white p-2 rounded w-1/2"
                  disabled={parkMutation.isLoading}
                >
                  {parkMutation.isLoading ? "Parking..." : "Confirm"}
                </button>
              </div>
            </div>
          </div>
        )}
        <SubscriptionSection />
        {/* Notification Popup */}
        {notification && (
          <div
            className={`fixed top-4 right-4 p-3 text-white rounded-md ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
