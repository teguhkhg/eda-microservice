import express from "express";
import "express-async-error";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "./errors/notFoundError";
import { errorHandler } from "./middlewares/errorHandler";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

const start = async () => {
  try {
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth");

    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
  app.listen(3000, () => {
    console.log("Listening to port 3000");
  });
};

start();
