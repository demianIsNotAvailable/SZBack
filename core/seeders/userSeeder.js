import mongoose from "mongoose"
import bcrypt from "bcrypt"
import { faker } from "@faker-js/faker";
import config from "../config.js";
import { User } from "../../entities/users/model.js";


const seedUsers = async (count) => {
    let users = []  
    for (let i = 0; i < count; i++) {
      const user = new User({
        name: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("PassWord12!", config.HASH_ROUNDS),
        city: faker.location.city(),
        province: faker.location.state(),
      });
      users.push(user)
    }
    return await User.insertMany(users)
  }

mongoose.connect(config.DB_URL)
    .then(() => console.log(`Database up @ ${config.DB_URL}`))
    .then(() => seedUsers(20))
    .catch((err) => console.error(`Failed to connect to database`, err))