import axios from "axios"
import { getUserToken } from "../utilities/handleToken"
import { BASE_URL } from "../utilities/url"

export const registerAPI= async(data)=>{
  console.log(data)
  const response = await axios.post(`${BASE_URL}/user/register`,data)
  return response?.data 
}


export const loginAPI=async(data)=>{
  console.log(data);
  const response = await axios.post(`${BASE_URL}/user/login`,data)

  return response?.data
}  
export const getOneUserAPI = async(userId)=>{
  const token = getUserToken()
  const response = await axios.get(`${BASE_URL}/user/getoneuser/${userId}`,{
    
    headers:{
      Authorization:`Bearer ${token}`
    }
  });
  return response?.data

}
