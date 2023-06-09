import express from "express";
import { signupRouter } from "./routes/signup";
import { NotFoundError } from "./errors/notFoundError";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();
app.use(express.json());

app.use(signupRouter);

app.all("*", async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
