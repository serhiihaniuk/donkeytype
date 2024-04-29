//@ts-nocheck
import express, { Express, Response } from 'express';
import dotenv from 'dotenv';
import Fingerprint from 'express-fingerprint';
import { authRouter } from './router';
import cookieParser from 'cookie-parser';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api/v1/auth', authRouter);

app.use(express.static('frontend/dist'));

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', 'https://donkey-type.vercel.app'],
    credentials: true,
  })
);

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
);

// app.get('/api/v1/resource/protected', TokenService.checkAccess, (_, res) => {
//   return res.status(200).json('Welcome' + Date.now());
// });


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
