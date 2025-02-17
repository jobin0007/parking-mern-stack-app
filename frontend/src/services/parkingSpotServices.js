import axios from "axios";
import { BASE_URL } from "../utilities/url";
import { getUserToken } from "../utilities/handleToken";

export const getAvailableParkingSpotsAPI = async (location, vehicleType) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/parking-spot/search-spots`,
        {
          params: { location, vehicleType },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error fetching parking spots." };
    }
  };
  export const parkVehicleAPI = async (parkingSpotId, vehicleNumber) => {
    const token = getUserToken(); // Get token from local storage or cookies

    if (!token) {
        throw new Error("User is not authenticated");
    }

    const response = await axios.post(
        `${BASE_URL}/parking/park/${parkingSpotId}`,
        { vehicleNumber },
        {
            headers: {
                Authorization: `Bearer ${token}`
            },
        }
    );
    console.log("tok",token)
    return response.data;
};

export const findMyVehicleAPI = async (vehicleNumber) => {
  const token = getUserToken();
 console.log("token",token)
  if (!token) {
    throw new Error("Unauthorized: Please log in to search for your vehicle.");
  }

  const response = await axios.get(`${BASE_URL}/parking-spot/find-my-vehicle`, {
    params: { vehicleNumber }, 
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
export const checkoutAPI = async (bookingId) => {
  const token = getUserToken();
  if (!token) throw new Error("User is not authenticated");

  const response = await axios.post(
    `${BASE_URL}/parking/checkout/${bookingId}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log("url",response)
  return response.data;
};


// Create Razorpay order
// Create Razorpay order
export const createRazorpayOrderAPI = async (bookingId) => {
  const token = getUserToken();
  if (!token) throw new Error("User is not authenticated");
  const response = await axios.post(`${BASE_URL}/payment/create-order/${bookingId}`,{},
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// Verify Razorpay payment
export const verifyRazorpayPaymentAPI = async (paymentData) => {
  const token = getUserToken();
  const response = await axios.post(`${BASE_URL}/payment/verify-payment`, paymentData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};