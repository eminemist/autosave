import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();

import "express-async-errors";
import morgan from "morgan";


import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

//security packages import 
import helmet from "helmet";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";



const PORT = process.env.PORT || 5000;

//db and authenticateUser
import connectDB from "./db/connect.js";


// import router
import authRouter from "./routes/authRoutes.js";
import fileRouter from "./routes/fileRouter.js"


// import middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}


//security packages use
app.use(express.json());
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());


const __dirname = dirname(fileURLToPath(import.meta.url));
// only when ready to deploy
app.use(express.static(path.resolve(__dirname, "./client/build")));


// app.get("/", (req, res) => {
//   res.json({ msg: "ok yes connected" });
// });

// app.get("/api/v1", (req, res) => {
//   res.json({ msg: "API" });
// });


//routers
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/files", authenticateUser,fileRouter);


// only when ready to deploy
app.get("*", function (request, response) {
  response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});


//middlewares
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
      console.log(`listening on ${PORT}......`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
