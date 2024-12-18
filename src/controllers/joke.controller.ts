import { Request, Response } from 'express';
import { Joke } from '../models/joke.model';

const getJokes = async (req: Request, res: Response) => {
  try {
    const jokes = await Joke.find();
    res.status(200).json(jokes);
  } catch (error: any) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

const addJoke = async (req: Request, res: Response) => {
  const { joke, category } = req.body;
  try {
    const newJoke = new Joke({ joke, category });
    await newJoke.save();
    res.status(201).json(newJoke);
  } catch (error: any) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

export { getJokes, addJoke };
