import express, { Express, Request, Response } from "express";
const cors = require('cors');

import authRouter from "./routes/auth";
import roastsRouter from "./routes/roasts";
import usersRouter from "./routes/users";

const app: Express = express();

const whitelist = ["https://roastreport.web.app", "http://localhost/"];
const corsOptions = {
  origin: function (origin: string, callback: Function) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use((req: Request, _: any, next: any) => {
  const dateAndTime = new Date().toLocaleString("en-GB", { timeZone: "NZ" });
  console.log(
    `At ${dateAndTime}: Request for ${req.method} ${req.originalUrl}`,
  );

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
