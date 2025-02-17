// import { Schema, model, Document } from "mongoose";

// export interface IUser extends Document {
//   name: string;
//   email: string;
//   password: string;
//   mobile_number: string;
//   role:string;
// }

// const UserSchema = new Schema<IUser>({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   mobile_number: { type: String, required: true, unique: true },
//   role: { type: String, default: 'user' }
// });

// const User = model<IUser>("User", UserSchema);
// export default User;

const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile_number: { type: String, required: true, unique: true },
  role: { type: String, default: "user" },
});

const User = model("User", UserSchema);

module.exports = User;
