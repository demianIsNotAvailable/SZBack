import mongoose from "mongoose";
import config from "../config.js";
import { Edition } from "../../entities/editions/model.js";
import { User } from "../../entities/users/model.js";
import seedEditions from "./editionSeeder.js";
import seedUsers from "./userSeeder.js";

mongoose
  .connect(config.DB_URL)
  .then(() => User.deleteMany({ role: { $nin: ["ADMIN", "SUPERADMIN"] } }))
  .then(() => Edition.deleteMany({}))
  .then(() => seedUsers(30, true))
  .then(() => seedEditions(15, true))
  .then(() => console.log(`Database up and seeded.`))
  .catch((err) => console.error(`Failed to connect to database`, err));
