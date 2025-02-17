
// import React, { useState } from "react";
// import { useMutation } from "@tanstack/react-query";
// import { useFormik } from "formik";
// import * as Yup from "yup";
// import { findMyVehicleAPI, checkoutAPI, createRazorpayOrderAPI, verifyRazorpayPaymentAPI } from "../../services/parkingSpotServices";

// const FindMyVehicle = () => {
//   const [bookingId, setBookingId] = useState("");
//   const [receipt, setReceipt] = useState(null);

//   const formik = useFormik({
//     initialValues: { vehicleNumber: "", result: null, error: "" },
//     validationSchema: Yup.object({
//       vehicleNumber: Yup.string().trim().required("Vehicle number is required"),
//     }),
//     onSubmit: (values) => vehicleMutation.mutate(values.vehicleNumber.trim()),
//   });

//   const vehicleMutation = useMutation({
//     mutationFn: findMyVehicleAPI,
//     onSuccess: (data) => {
//       if (data?.vehicleDetails) {
//         formik.setValues({ vehicleNumber: "", result: data, error: "" });
//         setBookingId(data.vehicleDetails.bookingId || "");
//         setReceipt(null);
//       } else {
//         formik.setValues({ vehicleNumber: "", result: null, error: "No vehicle found." });
//         setBookingId("");
//         setReceipt(null);
//       }
//     },
//     onError: (error) => {
//       formik.setValues({ vehicleNumber: "", result: null, error: error.response?.data?.message || "Error finding vehicle" });
//       setBookingId("");
//       setReceipt(null);
//     },
//   });

//   const checkoutMutation = useMutation({
//     mutationFn: checkoutAPI,
//     onSuccess: (data) => {
//       setReceipt(data.receipt);
//       formik.setFieldValue("error", "");
//     },
//     onError: (error) => {
//       formik.setFieldValue("error", error.response?.data?.message || "Error processing checkout");
//     },
//   });

//   const handleRazorpayPayment = async () => {
//     try {
//       const orderData = await createRazorpayOrderAPI(bookingId);
//       if (!orderData || !orderData.order_id) {
//         console.error("❌ Failed to create Razorpay order.");
//         return;
//       }

//       const options = {
//         key: process.env.RAZORPAY_KEY_ID,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Find a Parking Spot",
//         description: "Parking Fee Payment",
//         order_id: orderData.order_id,
//         handler: async (response) => {
//           try {
//             const verifyData = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               bookingId,
//             };
//             await verifyRazorpayPaymentAPI(verifyData);
//             alert("✅ Payment Successful!");
//           } catch (error) {
//             console.error("❌ Payment verification failed:", error);
//             alert("❌ Payment failed. Please try again.");
//           }
//         },
//         prefill: { name: "User Name", email: "user@example.com", contact: "9999999999" },
//         theme: { color: "#3399cc" },
//       };

//       const razorpay = new window.Razorpay(options);
//       razorpay.open();
//     } catch (error) {
//       console.error("❌ Error initializing Razorpay:", error);
//     }
//   };

//   return (
//     <div className="p-4 max-w-md font-montserrat  mx-auto bg-gray-900 text-white shadow-md rounded-md">
//       <h2 className="text-xl font-semibold text-center mb-4">Find My Vehicle</h2>

//       <form onSubmit={formik.handleSubmit} className="space-y-4">
//         <input
//           type="text"
//           name="vehicleNumber"
//           placeholder="Enter Vehicle Number"
//           value={formik.values.vehicleNumber}
//           onChange={formik.handleChange}
//           className="border p-2 rounded w-full bg-gray-900"
//         />
//         <button type="submit" className="bg-gray-900 border border-white text-white px-4 py-2 rounded w-full" disabled={vehicleMutation.isLoading}>
//           {vehicleMutation.isLoading ? "Searching..." : "Find Vehicle"}
//         </button>
//       </form>

//       {formik.values.error && <p className="text-red-500 mt-2">{formik.values.error}</p>}

//       <div className="mt-4 border p-4 rounded bg-gray-900 overflow-y-auto max-h-[calc(100vh-200px)]">
//         {formik.values.result?.vehicleDetails && (
//           <div>
//             <p><strong>Vehicle Number:</strong> {formik.values.result.vehicleDetails.vehicleNumber}</p>
//             <p><strong>Parking Spot:</strong> {formik.values.result.vehicleDetails.spotLocation?.address}</p>
//             <p><strong>Booking ID:</strong> {formik.values.result.vehicleDetails.bookingId || "Not Found"}</p>
//             <p><strong>Payment Status:</strong> {formik.values.result.vehicleDetails.paymentStatus}</p>

//             <button
//               onClick={() => checkoutMutation.mutate(formik.values.result.vehicleDetails.bookingId)}
//               className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
//               disabled={!formik.values.result.vehicleDetails.bookingId || checkoutMutation.isLoading}
//             >
//               {checkoutMutation.isLoading ? "Processing..." : "Checkout"}
//             </button>
//           </div>
//         )}

//         {receipt && (
//           <div className="bg-gray-900 p-4 rounded shadow-md w-full mt-4 overflow-y-auto max-h-[400px]">
//             <h2 className="text-xl font-semibold mb-2 text-center">Parking Receipt</h2>

         
//             <div className="flex justify-between border-b py-2">
//               <span className="font-medium">Vehicle Number:</span>
//               <span>{receipt.vehicleNumber}</span>
//             </div>
//             <div className="flex justify-between border-b py-2">
//               <span className="font-medium">Vehicle Type:</span>
//               <span>{receipt.vehicleType}</span>
//             </div>
           
//             <div className="flex justify-between border-b py-2">
//               <span className="font-medium">Start Time:</span>
//               <span>{new Date(receipt.startTime).toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between border-b py-2">
//               <span className="font-medium">End Time:</span>
//               <span>{new Date(receipt.endTime).toLocaleString()}</span>
//             </div>
//             <div className="flex justify-between border-b py-2">
//               <span className="font-medium">Total Fee:</span>
//               <span>${receipt.totalFee}</span>
//             </div>
//             <div className="flex justify-between py-2">
//               <span className="font-medium">Payment Status:</span>
//               <span className={receipt.paymentStatus === "pending" ? "text-red-500" : "text-green-500"}>
//                 {receipt.paymentStatus}
//               </span>
//             </div>
//             {receipt.paymentStatus === "pending" && (
//               <button onClick={handleRazorpayPayment} className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4">
//                 Proceed to Payment
//               </button>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FindMyVehicle;


import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import * as Yup from "yup";
import { findMyVehicleAPI, checkoutAPI, createRazorpayOrderAPI, verifyRazorpayPaymentAPI } from "../../services/parkingSpotServices";

const FindMyVehicle = () => {
  const [bookingId, setBookingId] = useState("");
  const [receipt, setReceipt] = useState(null);

  const formik = useFormik({
    initialValues: { vehicleNumber: "", result: null, error: "" },
    validationSchema: Yup.object({
      vehicleNumber: Yup.string().trim().required("Vehicle number is required"),
    }),
    onSubmit: (values) => vehicleMutation.mutate(values.vehicleNumber.trim()),
  });

  const vehicleMutation = useMutation({
    mutationFn: findMyVehicleAPI,
    onSuccess: (data) => {
      if (data?.vehicleDetails) {
        formik.setValues({ vehicleNumber: "", result: data, error: "" });
        setBookingId(data.vehicleDetails.bookingId || "");
        setReceipt(null);
      } else {
        formik.setValues({ vehicleNumber: "", result: null, error: "No vehicle found." });
        setBookingId("");
        setReceipt(null);
      }
    },
    onError: (error) => {
      formik.setValues({ vehicleNumber: "", result: null, error: error.response?.data?.message || "Error finding vehicle" });
      setBookingId("");
      setReceipt(null);
    },
  });

  const checkoutMutation = useMutation({
    mutationFn: checkoutAPI,
    onSuccess: (data) => {
      setReceipt(data.receipt);
      formik.setFieldValue("error", "");
    },
    onError: (error) => {
      formik.setFieldValue("error", error.response?.data?.message || "Error processing checkout");
    },
  });

  const handleRazorpayPayment = async () => {
    try {
      const orderData = await createRazorpayOrderAPI(bookingId);
      if (!orderData || !orderData.order_id) {
        console.error("❌ Failed to create Razorpay order.");
        return;
      }

      const options = {
        key: process.env.RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Find a Parking Spot",
        description: "Parking Fee Payment",
        order_id: orderData.order_id,
        handler: async (response) => {
          try {
            const verifyData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingId,
            };
            await verifyRazorpayPaymentAPI(verifyData);
            alert("✅ Payment Successful!");
          } catch (error) {
            console.error("❌ Payment verification failed:", error);
            alert("❌ Payment failed. Please try again.");
          }
        },
        prefill: { name: "User Name", email: "user@example.com", contact: "9999999999" },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("❌ Error initializing Razorpay:", error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white shadow-md rounded-md h-[calc(100vh-50px)] overflow-y-auto">
      <h2 className="text-xl font-semibold text-center mb-4">Find My Vehicle</h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Enter Vehicle Number"
          value={formik.values.vehicleNumber}
          onChange={formik.handleChange}
          className="border p-2 rounded w-full bg-gray-900"
        />
        <button type="submit" className="bg-gray-900 border border-white text-white px-4 py-2 rounded w-full" disabled={vehicleMutation.isLoading}>
          {vehicleMutation.isLoading ? "Searching..." : "Find Vehicle"}
        </button>
      </form>

      {formik.values.error && <p className="text-red-500 mt-2">{formik.values.error}</p>}

      <div className="mt-4 border p-4 rounded bg-gray-900">
        {formik.values.result?.vehicleDetails && (
          <div>
            <p><strong>Vehicle Number:</strong> {formik.values.result.vehicleDetails.vehicleNumber}</p>
            <p><strong>Parking Spot:</strong> {formik.values.result.vehicleDetails.spotLocation?.address}</p>
            <p><strong>Booking ID:</strong> {formik.values.result.vehicleDetails.bookingId || "Not Found"}</p>
            <p><strong>Payment Status:</strong> {formik.values.result.vehicleDetails.paymentStatus}</p>

            <button
              onClick={() => checkoutMutation.mutate(formik.values.result.vehicleDetails.bookingId)}
              className="bg-green-500 text-white px-4 py-2 rounded w-full mt-4"
              disabled={!formik.values.result.vehicleDetails.bookingId || checkoutMutation.isLoading}
            >
              {checkoutMutation.isLoading ? "Processing..." : "Checkout"}
            </button>
          </div>
        )}

        {receipt && (
          <div className="bg-gray-900 p-4 rounded shadow-md w-full mt-4">
            <h2 className="text-xl font-semibold mb-2 text-center">Parking Receipt</h2>

            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Vehicle Number:</span>
              <span>{receipt.vehicleNumber}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Vehicle Type:</span>
              <span>{receipt.vehicleType}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Start Time:</span>
              <span>{new Date(receipt.startTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">End Time:</span>
              <span>{new Date(receipt.endTime).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-b py-2">
              <span className="font-medium">Total Fee:</span>
              <span>${receipt.totalFee}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Payment Status:</span>
              <span className={receipt.paymentStatus === "pending" ? "text-red-500" : "text-green-500"}>
                {receipt.paymentStatus}
              </span>
            </div>
            {receipt.paymentStatus === "pending" && (
              <button onClick={handleRazorpayPayment} className="bg-red-500 text-white px-4 py-2 rounded w-full mt-4">
                Proceed to Payment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FindMyVehicle;
