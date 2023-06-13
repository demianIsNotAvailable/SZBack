import express from 'express';
import { createUser, deleteUser, getUser, listUsers, updateUser, findRoles, createRoles } from './controller.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        res.json(await createUser(req.body))
    } catch(e) {
        next(e)
    }
})




router.get('/:id', async (req, res, next) => {
    try {
        res.json(await getUser(req.params.id))
    } catch(e) {
        next(e)
    }
});


router.put('/:id', async (req, res, next) => {
    try {
        res.json(await updateUser(req.params.id, req.body))
    } catch(e) {
        next(e)
    }
});


router.delete('/:id', async (req, res, next) => {
    try {
        res.json(await deleteUser(req.params.id))
    } catch(e) {
        next(e)
    }
});


router.get('/', async (req, res, next) => {
    try {
        res.json(await listUsers())
    } catch(e) {
        next(e)
    }

});


export default router