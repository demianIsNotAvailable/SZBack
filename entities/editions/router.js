import  express  from "express";
import { auth } from "../../core/middlewares.js";
import { createEdition, listEditions, findEdition, updateEdition } from "./controller.js";

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

router.post('/:id', auth, async (req, res, next) => {
    try {
        res.json(await signUp(req.params,id, req.token.id))
    } catch (e) {
        next(e)
    }
})





export default router