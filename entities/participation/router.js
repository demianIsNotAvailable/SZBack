import express from 'express';
import { auth } from '../../core/middlewares.js';

const router = express.Router();

router.post('/', auth("USER"), async (req, res, next) => {
  try {
    res.json(await createParticipation(req.body, req.token))
  } catch(e) {
    next(e)
  }
});

router.get('/', auth("USER"), async (req, res, next) => {
  try {
    res.json(await getParticipationList(req.query.character, req.token))
  } catch(e) {
    next(e)
  }
});


router.put('/:id', auth("USER"), async (req, res, next) => {
  try {
    res.json(await updateParticipation(req.params.id, req.body, req.token))
  } catch(e) {
    next(e)
  }
});

router.delete('/', auth("USER"), async (req, res, next) => {
  try {
    res.json(await deleteParticipation(req.query.id, req.query.charId, req.token))
  } catch(e) {
    next(e)
  }
});

export default router