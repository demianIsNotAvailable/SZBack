import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { faker } from "@faker-js/faker";
import config from "../config.js";
import { Edition } from "../../entities/editions/model.js";
import { User } from "../../entities/users/model.js";
import seedEditions from "./editionSeeder.js";
import seedUsers from "./userSeeder.js";



mongoose.connect(config.DB_URL)
    .then(() => console.log(`Database up and seeded.`))
  //.then(() => User.deleteMany({}))
  //.then(() => Edition.deleteMany({}))
    .then(() => seedUsers(30))
    .then(() => seedEditions(15))
    .catch((err) => console.error(`Failed to connect to database`, err))