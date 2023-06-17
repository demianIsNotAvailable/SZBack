import  express  from "express";
import { auth } from "../../core/middlewares.js";
import { Edition } from "./model.js";

const router = express.Router();

router.post('/', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(createEdition(req.body))
    } catch(e) {
        next(e)
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(listEditions(req.query.start, req.query.end, req.query.location))
    } catch(e) {
        next(e)
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        res.json(findEdition(req.params.id))
    } catch(e) {
        next(e)
    }
})


router.put('/:id', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(await updateEdition(req.params.id, data))
    } catch(e) {
        next(e)
    }
})





export default router