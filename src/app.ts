import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// const express = require('express')
const app: Application = express();
// import config from './app/config';
import config from './app/config';
import { carsRoute } from './app/modules/Car-Stor/Cars.route';
import { orderRoute } from './app/modules/Car-Oders/order.route';
console.log('Database URL:', config.database_url);

app.use(express.json());
// const port = 3000
app.use(cors());
app.use('/api/cars', carsRoute);
app.use('/api', orderRoute )
// app.post('/api/v1/cars', carsRoute );
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  console.log(process.cwd());
});

export default app;
