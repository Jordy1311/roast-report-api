import express, { Express, Request, Response } from "express";
const cors = require('cors');

var corsOptions = {
  origin: ['https://roastreport.web.app', 'http://localhost/'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

import authRouter from "./routes/auth";
import roastsRouter from "./routes/roasts";
import usersRouter from "./routes/users";

const app: Express = express();

// TODO: development only
app.use((req: any, _: any, next: any) => {
  console.log(`Request for ${req.method} ${req.originalUrl}`);
  next();
});

app.use(express.json());
app.use(cors(corsOptions));

app.use("/v1/login", authRouter);
app.use("/v1/roasts", roastsRouter);
app.use("/v1/users", usersRouter);

app.get(["/", "/health", "/status"], function (_: Request, res: Response) {
  res.status(200).send({ server: "OK" });
});

export default app;
