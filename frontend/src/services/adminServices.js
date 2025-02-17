import axios from "axios";
import { BASE_URL } from "../utilities/url";
import { getAdminToken } from "../utilities/handleToken";


// Register Admin
export const registerAdmin = async (adminData) => {

  const response = await axios.post(`${BASE_URL}/admin/register`, adminData);
  return response?.data;
};


// Login Admin
export const loginAdmin = async (adminData) => {
  const response = await axios.post(`${BASE_URL}/admin/login`, adminData);
  return response.data;
};

export const getOneAdminAPI = async(adminId)=>{
  const token = getAdminToken();
  const response = await axios.get(`${BASE_URL}/admin/getoneadmin/${adminId}`,{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  console.log(response?.data);
  return response?.data

}
export const createParkingSpotAPI = async (spotData) => {
  const token = getAdminToken();
  console.log("Making API request with data:", spotData); // ✅ Debugging Line

  const response = await axios.post(
    `${BASE_URL}/parking-spot/create-parking`,
    spotData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  console.log("API Response Data:", response.data); // ✅ Debugging Line
  return response.data;
};
export const getAllParkingSpotsAPI = async () => {
  const response = await axios.get(`${BASE_URL}/parking-spot/all-parking-spots`);
  return response.data;
};  



export const deleteParkingSpotAPI = async (spotId) => {
  const token = getAdminToken() // Assuming token storage
  const response = await axios.delete(`${BASE_URL}/parking-spot/delete-spot/${spotId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};


export const updateParkingSpotAvailabilityAPI = async (spotId, isAvailable) => {
  const token = getAdminToken();

  console.log("Updating spot availability:", { spotId, isAvailable }); 

  try {
    const response = await axios.put(
      `${BASE_URL}/parking-spot/update-parkingspots/${spotId}`,
      { isAvailable },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("API Response:", response.data); // 🔍 Debugging
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
};
