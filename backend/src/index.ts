// @ts-nocheck
import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';
import { authRouter, wordsRouter } from './router';
import cookieParser from 'cookie-parser';
import path from 'path';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(cookieParser());
app.use(express.json());

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/words', wordsRouter)

app.use(express.static(path.join(__dirname, '../../src/frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../src/frontend/dist', 'index.html'));
});

// app.get('/api/v1/resource/protected', TokenService.checkAccess, (_, res) => {
//   return res.status(200).json('Welcome' + Date.now());
// });

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
