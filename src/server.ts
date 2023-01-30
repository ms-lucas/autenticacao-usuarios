import "dotenv/config";
import "express-async-errors";
import express, { NextFunction, Request, Response } from "express";
import { routes } from "./routes";

const port = process.env.APP_PORT || 3333;

const app = express();
app.use(express.json());

app.use(routes);

app.use(
    (error: Error, request: Request, response: Response, next: NextFunction) => {
      return response.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  );

app.listen(port, () => console.log(`The server started, port ${port}`));
