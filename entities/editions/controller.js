import { User } from "../users/model.js";
import Jwt from "jsonwebtoken";
import { Edition } from "./model.js";
import config from "../../core/config.js";

export const upsertEdition = async (data) => {
  if (
    !data.location ||
    !data.date ||
    !data.time ||
    !data.description ||
    !data.type
  ) {
    throw new Error("MISSNIG_DATA");
  }

  if (!data.id) return Edition.create(data);

  return Edition.findOneAndUpdate({ _id: data.id }, data, { new: true });
};

// por defecto devuelve todos los eventos, pero puedes filtrar dinámicamente por fechas, localizaciones y si como usuario estás apuntado.
export const listEditions = async (
  start = "",
  end = "",
  location = "",
  page = "1",
  limit = "9",
  headers
) => {
  const filter = { $and: [{ active: true }] };

  if (location) {
    const locationRegex = new RegExp(location, "i");
    filter.$and.push({ location: { $regex: locationRegex } });
  }  if (start && !end) filter.$and.push({ date: { $gte: start } });
  if (end && !start) filter.$and.push({ date: { $lte: end } });
  if (start && end) filter.$and.push({ date: { $gte: start } }, { start: { $lte: end } });

  const pageNum = Number(page);
  const limitNum = Number(limit);
  const skips = limitNum * (pageNum - 1);

  if (headers.authorization) {
    const token = headers.authorization.split(" ")[1];
    try {
      const decodedToken = Jwt.verify(token, config.SECRET);
      if (decodedToken.role === "ADMIN" || decodedToken.role === "SUPERADMIN") {
        const events = await Edition.find(filter)
          .select("+users")
          .collation({ locale: "en", strength: 2 })
          .sort({ date: 1 })
          .skip(skips)
          .limit(limitNum);
        const totalDocuments = await Edition.countDocuments(filter);
        const totalPages = Math.ceil(totalDocuments / limitNum);
        return { events, totalPages };
      }
    } catch (e) {
      throw new Error(e);
    }
  } else {
    const events = await Edition.find(filter)
      .collation({ locale: "en", strength: 2 })
      .sort({ date: 1 })
      .skip(skips)
      .limit(limitNum);
    const totalDocuments = await Edition.countDocuments(filter);
    const totalPages = Math.ceil(totalDocuments / limitNum);
    return { events, totalPages };
  }
};

export const findEdition = async (id) => {
  return Edition.findOne({ _id: id, active: true });
};

export const updateEdition = async (id, data) => {
  return Edition.findOneAndUpdate({ _id: id }, data);
};

// ternaria que te apunta al evento si no estás apuntado, y te borra si ya lo estás.
export const joinEdition = async (editionId, token) => {
  const userId = token.id;
  const user = await User.findById(userId).select("events");
  const edition = await Edition.findById(editionId).select("users");

  user.events.includes(editionId) || edition.users.includes(userId)
    ? (edition.users.splice(edition.users.indexOf(userId, 1)),
      user.events.splice(user.events.indexOf(editionId, 1)))
    : (user.events.push(edition._id), edition.users.push(user._id));

  return Promise.all([user.save(), edition.save()]);
};
