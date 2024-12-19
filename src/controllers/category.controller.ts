import { Request, Response } from 'express';
import { Category } from '../models/category.model';
import axios from 'axios';

const addCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  try {
    const newCategory = new Category({ category });
    await newCategory.save();

    await axios.post(`${process.env.DELIVER_SERVICE_URL}/category`, {
      category,
    });

    res.status(201).json(category);
  } catch (error: any) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

const getJokeCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().select('category -_id');
    const categoryNames = categories.map((cat: any) => cat.category);
    res.status(200).json(categoryNames);
  } catch (error: any) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

export { addCategory, getJokeCategories };
