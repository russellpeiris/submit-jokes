import { model, Schema } from 'mongoose';

const jokesSchema = new Schema({
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
