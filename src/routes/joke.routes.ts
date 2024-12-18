import { Router } from 'express';
import { addJoke, getJokes } from '../controllers/joke.controller';

export const jokesRouter = Router();

jokesRouter.get('/', getJokes);
jokesRouter.post('/', addJoke);
