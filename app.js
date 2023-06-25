import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "./core/config.js";
import userRouter from "./entities/users/router.js"
import editionRouter from "./entities/editions/router.js"
import characterRouter from "./entities/characters/router.js"
import participationRouter from "./entities/participation/router.js"
import { errorHandler } from "./core/middlewares.js";


const app = express();
mongoose.connect(config.DB_URL)
    .then(()=> console.log(`Database up!`))
    .catch((err) => console.error(`Failed to connect to database`, err))


const corsOptions = {
    origin: '*',
    methods: `GET,HEAD,PUT,PATCH,POST,DELETE`,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    allowedHeaders: `Origin,X-Requested-With,Content-Type,Accept,Authorization`
}


app.use(express.json());
app.get('/', (req, res)=> res.send('Healthcheck: ok'))
app.use(cors(corsOptions));
app.use('/editions', editionRouter) 
app.use('/users', userRouter)
app.use('/characters', characterRouter)
app.use('/characters/events', participationRouter)
app.listen(config.PORT, () => console.log(`Server listening @ ${config.PORT}`)) 
app.use(errorHandler)

