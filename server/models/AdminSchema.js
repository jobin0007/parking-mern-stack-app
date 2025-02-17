// import { Schema, model, Document } from "mongoose";

// export interface IAdmin extends Document {
//   name: string;
//   email: string;
//   password: string;
//   mobile_number: string;
//   role:string;
// }

// const AdminSchema = new Schema<IAdmin>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   mobile_number: { type: String, required: true, unique: true },
//   role: { type: String, default: 'admin' }
// });

// const Admin = model<IAdmin>("Admin", AdminSchema);
// export default Admin;

const { Schema, model } = require("mongoose");

const AdminSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_number: { type: String, required: true, unique: true },
  role: { type: String, default: "admin" }
});

const Admin = model("Admin", AdminSchema);
module.exports = Admin;
