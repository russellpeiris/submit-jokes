import axios from 'axios';
import { Request, Response } from 'express';
import { Category } from '../models/category.model';
import dotenv from 'dotenv';

const environment = process.env.NODE_ENV || 'development';
console.log('environment :', environment);
dotenv.config({ path: `.env.${environment}` });

const addCategory = async (req: Request, res: Response) => {
  const { category } = req.body;
  try {
    const newCategory = new Category({ category });

    const deliverResponse = await axios.post(
      `${process.env.DELIVER_SERVICE_URL}/deliver-service/category`,
      {
        category,
      },
    );

    if (deliverResponse.status == 201) {
      await newCategory.save();
      res.status(201).json(category);
    }
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
