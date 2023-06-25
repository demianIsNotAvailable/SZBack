import express from 'express';
import { createCharacter, getMyCharacters, findCharactersByFactionEvent, updateCharacter, deleteCharacter } from './controller.js';
import { auth } from '../../core/middlewares.js';

const router = express.Router();

router.post('/', auth("USER"), async (req, res, next) => {
  try {
    res.json(await createCharacter(req.body, req.token))
  } catch(e) {
    next(e)
  }
});

router.get('/', auth("USER"), async (req, res, next) => {
  try {
    res.json(await getMyCharacters(req.token))
  } catch(e) {
    next(e)
  }
});


router.get('/', auth("VIP"), async (req, res, next) => {
  try {
    res.json(await findCharactersByFactionEvent(req.query.faction, req.query.event))
  } catch(e) {
    next(e)
  }
});


router.get('/:id', auth("USER"), async (req, res, next) => {
  try {
    res.json(await getCharacterById(req.params.id, req.token))
  } catch(e) {
    next(e)
  }
});


router.put('/:id', auth("USER"), async (req, res, next) => {
  try {
    res.json(await updateCharacter(req.params.id, req.body, req.token))
  } catch(e) {
    next(e)
  }
});

router.delete('/:id', auth("USER"), async (req, res, next) => {
  try {
    res.json(await deleteCharacter(req.params.id, req.token))
  } catch(e) {
    next(e)
  }
});

export default router