import mongoose from "mongoose";
import { faker } from "@faker-js/faker";
import { Edition } from "../../entities/editions/model.js";
import config from "../config.js";

const seedEditions = async (count) => {
  let editions = [];
  for (let i = 0; i < count; i++) {
    const user = new Edition({
      location: faker.location.city(),
      date: faker.date.anytime(),
      time: faker.number.int({ min: 12, max: 23 }),
      description: faker.lorem.paragraph(3),
      type: faker.helpers.arrayElement([
        "SZ",
        "48h",
        "Rojo",
        "La Purga",
        "Cazadores de Demonios",
        "Juegos del Calamar",
        "Otros",
      ]),
    });
    editions.push(user);
  }
  return await Edition.insertMany(editions);
};

mongoose
      .connect(config.DB_URL)
      .then(() => console.log(`Database seeded with editions`))
      .then(() => Edition.deleteMany({}))
      // .then(() => seedEditions(10))
      .catch((err) => console.error(`Failed to connect to database`, err));

export default seedEditions;
