import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./core/config.js";


const app = express();

mongoose.connect(config.DB_URL)
    .then(()=> console.log(`Database up @ ${config.DB_URL}`))
    .catch((err) => console.error(`Failed to connect to database`, err))


const corsOptions = {
    origin: '*',
    methods: `GET,HEAD,PUT,PATCH,POST,DELETE`,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: `Origin,X-Requested-With,Content-Type,Accept,Authorization`
}


app.use(express.json());
app.use(cors(corsOptions));

app.listen(config.PORT, () => console.log(`Server listening @ ${config.PORT}`))

