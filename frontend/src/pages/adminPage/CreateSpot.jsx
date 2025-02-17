import React, { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "@tanstack/react-query";
import { createParkingSpotAPI } from "../../services/adminServices";
import { AiOutlineClose } from "react-icons/ai";

const CreateSpot = () => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const mutation = useMutation({
    mutationFn: createParkingSpotAPI,
    onSuccess: () => {
      showNotification("Parking spot created successfully!", "success");
      formik.resetForm();
    },
    onError: (error) => {
      showNotification(
        error.response?.data?.message || "Error creating spot",
        "error"
      );
    },
  });

  const formik = useFormik({
    initialValues: {
      address: "",
      city: "",
      vehicleType: "car",
      firstHour: "",
      additionalHour: "",
    },
    onSubmit: (values) => {
      const spotData = {
        location: { address: values.address, city: values.city },
        vehicleType: values.vehicleType.toLowerCase(), // ✅ Convert to lowercase
        rate: {
          firstHour: Number(values.firstHour),
          additionalHour: Number(values.additionalHour),
        },
      };

      console.log("Submitting Spot Data:", spotData); // 🔍 Debugging
      mutation.mutate(spotData);
    },
  });

  return (
    <div className="max-w-lg mx-auto font-montserrat bg-white p-6 shadow-lg rounded-md relative">
      <h2 className="text-2xl font-bold mb-4">Create Parking Spot</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Address</label>
          <input
            type="text"
            name="address"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.address}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">City</label>
          <input
            type="text"
            name="city"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.city}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Vehicle Type</label>
          <select
            name="vehicleType"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.vehicleType}
            required
          >
            <option value="car">Car</option> 
            <option value="bike">Bike</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Rate (First Hour)</label>
          <input
            type="number"
            name="firstHour"
            className="w-full p-2 border rounded"
            onChange={(e) => formik.setFieldValue("firstHour", Number(e.target.value))}
            value={formik.values.firstHour}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Rate (Additional Hour)</label>
          <input
            type="number"
            name="additionalHour"
            className="w-full p-2 border rounded"
            onChange={(e) => formik.setFieldValue("additionalHour", Number(e.target.value))}
            value={formik.values.additionalHour}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Creating..." : "Create Spot"}
        </button>
      </form>
      {notification && (
        <div
          className={`fixed bottom-4 right-4 px-4 py-2 rounded-md text-white shadow-lg flex items-center space-x-2 ${
            notification.type === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="text-white ml-2">
            <AiOutlineClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateSpot;
