// @ts-nocheck
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import Fingerprint from "express-fingerprint";
import { authRouter } from "./router";
import cookieParser from "cookie-parser"
import cors from "cors"
import TokenService from "./services/tokenService";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
app.use(cookieParser())
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(
  Fingerprint({
    parameters: [Fingerprint.useragent, Fingerprint.acceptHeaders],
  })
  );
  
  
  app.get("/api/v1/resource/protected", TokenService.checkAccess, (_, res) => {
    return res.status(200).json("Welcome" + Date.now())
  })
  
app.use('/api/v1/auth', authRouter)

app.get("/", (req, res: Response) => {
  res.send('Main')
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});