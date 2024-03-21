//@ts-nocheck
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { router } from "./router";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use('/api', router)

app.get("/", (req, res: Response) => {
  res.send('hello world')
});


app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});