import express from "express";
import { User } from "./model.js";
import config from "../../core/config.js";
import Jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { deleteCharacter, getMyCharacters } from "../characters/controller.js";

export const createUser = async (data) => {
  const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/;
  if (!data.email || !data.password) throw new Error("MISSING_DATA");
  if (!reg.test(data.password)) throw new Error("INVALID_PASSWORD");
  if (data.role && data.role !== "GUEST") data.role = "GUEST";

  data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  return User.create(data);
};

export const login = async (req) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password +events"
  );
  if (!user || !(await bcrypt.compare(req.body.password, user.password)))
    throw new Error("INVALID_CREDENTIALS");
  const token = Jwt.sign(
    { id: user._id, email: user.email, events: user.events, role: user.role },
    config.SECRET
  );
  return { token };
};

export const findUserById = async (id) => {
  return User.findOne({ _id: id, active: true });
};

// por defecto devuelve todos los usuarios paginando de 10 en 10, pero acepta filtrado por nombre, apellido e email y configuración de paginación.
export const listUsers = async (username, page = 1, limit = 10) => {
  const reg = new RegExp(username, "i");
  return User.find({
    $and: [
      {
        $or: [{ name: reg }, { lastname: reg }, { email: reg }],
      },
      { active: true },
    ],
  })
    .sort({ lastname: "asc" })
    .skip((page - 1) * limit)
    .limit(limit);
};

export const updateUser = async (id, data) => {
  if (data.password) {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{10,30}$/;
    if (!reg.test(data.password)) throw new Error("INVALID_PASSWORD");

    data.password = await bcrypt.hash(data.password, config.HASH_ROUNDS);
  }

  return User.findByIdAndUpdate(id, data, { new: true });
};

export const deleteUser = async (id) => {
  User.findByIdAndUpdate(id, { active: false }).then(
    async () => {
      const chars = await getMyCharacters(token);
      chars.forEach((e) => deleteCharacter(e._id, token));
    }
  );
};

export const listUsersByRole = async (role) => {
  const findRole = role.toString().toUpperCase();
  return User.find({ role: findRole });
};
