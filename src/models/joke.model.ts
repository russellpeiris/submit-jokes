import { model, Schema, Types } from 'mongoose';

const jokesSchema = new Schema({
  jokeId: {
    type: String,
    required: true,
    default: () => new Types.ObjectId().toString(),
  },
  joke: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  submissionDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'unmoderated',
  },
});

export const Joke = model('Joke', jokesSchema);
