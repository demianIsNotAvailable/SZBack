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
        res.json(await listEditions(req.query.start, req.query.end, req.query.location, req.query.page, req.query.limit, req.headers))
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

router.put('/', auth(), async (req, res, next) => {
    try {
        res.json(await joinEdition(req.query.id, req.token))
    } catch (e) {
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







export default router