import { Request, Response } from 'express';
import { Joke } from '../models/joke.model';

const getNextUnmoderatedJoke = async (req: Request, res: Response) => {
  try {
    const joke = await Joke.findOne({ status: 'unmoderated' });
    if (!joke) {
      res.status(404).json('No jokes to moderate');
      return;
    }
    res.status(200).json(joke);
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

const deleteJoke = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const joke = await Joke.findByIdAndDelete(id);
    if (!joke) {
      res.status(404).json('Joke not found');
      return;
    }
    res.status(200).json(joke);
  } catch (error: any) {
    res.status(500).json(`Error: ${error.message}`);
  }
};

export { addJoke, deleteJoke, getNextUnmoderatedJoke };
