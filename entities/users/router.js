import express from 'express';
import { createUser, deleteUser, listUsers, updateUser, login, findUserById, listUsersByRole } from './controller.js';
import { auth } from '../../core/middlewares.js';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        res.json(await createUser(req.body))
    } catch(e) {
        next(e)
    }
})

router.post('/login', async (req, res, next)=>{
    try{ 
        res.json(await login(req))
    } catch(e){
        next(e)
    }
}) 


router.get('/profile', auth(), async (req, res, next) => {
    try {
        res.json(await findUserById(req.token.id))
    } catch (e) {
        next(e)
    }
})



router.get('/users/', auth("USER"), async (req, res, next) => {
    try {
        res.json(await listUsers(req.query.user, req.query.page, req.query.limit));
    } catch(e) {
        next(e)
    }

});

router.get('/users/:id', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(await listUsersByRole(req.params.id))
    } catch(e) {
        next(e)
    }
})

router.get('/:id', auth("USER"), async (req, res, next) => {
    try {
        res.json(await findUserById(req.params.id))
    } catch(e) {
        next(e)
    }
});


router.put('/profile', auth(), async (req, res, next) => {
    try {
        res.json(await updateUser(req.token.id, req.body))
    } catch(e) {
        next(e)
    }
});


router.put('/:id', auth("SUPERADMIN"), async (req, res, next) => {
    try {
        res.json(await updateUser(req.params.id, req.body))
    } catch(e) {
        next(e)
    }
})



router.delete('/profile', auth, async (req, res, next) => {
    try {
        res.json(await deleteUser(req.token.id))
    } catch(e) {
        next(e)
    }
})


router.delete('/:id', auth("ADMIN"), async (req, res, next) => {
    try {
        res.json(await deleteUser(req.params.id))
    } catch(e) {
        next(e)
    }
});



export default router