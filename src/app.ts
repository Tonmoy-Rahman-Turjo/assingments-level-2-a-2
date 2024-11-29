import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// const express = require('express')
const app: Application = express();
// import config from './app/config';
import config from './app/config';
console.log('Database URL:', config.database_url);

app.use(express.json());
// const port = 3000
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  console.log(process.cwd());
});

export default app;