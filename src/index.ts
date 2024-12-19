import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './configs/DBConnect';
import { categoryRouter } from './routes/category.routes';
import { jokesRouter } from './routes/joke.routes';

const env = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${env}` });

const app = express();
const port = process.env.PORT || 4001;
app.use(cors());

app.use(express.json());

app.use('/submit-service/jokes', jokesRouter);
app.use('/submit-service/category', categoryRouter);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});
