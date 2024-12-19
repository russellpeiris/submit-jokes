import { Router } from 'express';
import {
  addCategory,
  getJokeCategories,
} from '../controllers/category.controller';

export const categoryRouter = Router();

categoryRouter.get('/', getJokeCategories);
categoryRouter.post('/', addCategory);
