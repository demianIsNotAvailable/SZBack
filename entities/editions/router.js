import  express  from "express";
import { auth } from "../../core/middlewares.js";
import { upsertEdition, listEditions, findEdition, updateEdition, joinEdition } from "./controller.js";

const router = express.Router();

router.post('/', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(await upsertEdition(req.body))
    } catch(e) {
        next(e)
    }
})

router.get('/', async (req, res, next) => {
    try {
        res.json(await listEditions(req.query.start, req.query.end, req.query.location, req.headers))
    } catch(e) {
        next(e)
    }
})


router.get('/:id', async (req, res, next) => {
    try {
        res.json(await findEdition(req.params.id))
    } catch(e) {
        next(e)
    }
})


router.put('/:id', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(await updateEdition(req.params.id, req.body))
    } catch(e) {
        next(e)
    }
})

router.post('/:id', auth(), async (req, res, next) => {
    try {
        res.json(await joinEdition(req.params.id, req.token.id))
    } catch (e) {
        next(e)
    }
})





export default router