import { User } from "./model.js";
import config from "../../core/config.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const createUser = async (data) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,30}$/;
  if (!data.email || !data.password) throw new Error("MISSING_DATA");
  if (!reg.test(data.password)) throw new Error("INVALID_PASSWORD");
  if (data.role && data.role !== "GUEST") data.role = "GUEST"

  data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  return await User.create(data);
};


export const login = async (req) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    throw new Error("INVALID_CREDENTIALS");
  const token = Jwt.sign({id: user._id, role: user.role, email: user.email, phone: user.phone }, config.SECRET);
  return {token}
}


export const findUserById = async (id) => {
  return await User.findOne( { _id: id, active: true });
};


export const listUsers = async (username, page = 1, limit = 2) => {
  const reg = new RegExp(username, 'i')
  return User.find({
      $or: [
        { name: reg },
        { lastname: reg },
        { email: reg },
        { active: true }
      ]
    })
    .sort({ "lastname": 'asc'})
    .skip((page-1) * limit)
    .limit(limit)
};

export const updateUser = async (id, data) => {
  if (data.password) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,30}$/;
    if (!reg.test(data.password)) throw new Error("INVALID_PASSWORD");
  }
  data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  return await User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  return await User.findByIdAndUpdate(id, { active: false }, { new: true });
};


export const listUsersByRole = async (role) => {
  return await User.find({ role: role })
}