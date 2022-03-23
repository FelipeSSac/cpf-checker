/* eslint-disable no-console */
import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';

import express from 'express';
import cors from 'cors';

import { globalErrorHandling } from './middlewares/globalErrorHandler';
import { routes } from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);
app.use(globalErrorHandling);

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`🔥 Server started on port ${PORT}!`);
});
