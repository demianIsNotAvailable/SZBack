import { User } from "./model.js";
import config from "../../core/config.js";
import { Jwt } from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const reg = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
  if (!data.email || !data.password) throw new Error("MISSING_DATA");
  if (!reg.test(data.password)) throw new Error("INVALID_PASSWORD");

  data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  return await User.create(data);
};

export const getUser = async (id) => {
  return await User.findOne({ _id: id });
};

export const updateUser = async (id, data) => {
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { active: false });
};

export const listUsers = async () => {
  return await User.find({});
};
