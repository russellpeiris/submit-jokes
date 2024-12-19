import { Router } from 'express';
import {
  addJoke,
  deleteJoke,
  getNextUnmoderatedJoke,
} from '../controllers/joke.controller';

export const jokesRouter = Router();

jokesRouter.get('/', getNextUnmoderatedJoke);
jokesRouter.post('/', addJoke);
jokesRouter.delete('/:id', deleteJoke);
jokesRouter.patch('/:id');
