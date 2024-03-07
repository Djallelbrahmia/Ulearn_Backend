const express = require("express");
const app = express();
const dotenv = require("dotenv");
const auth = require("./routes/UserRoutes");
const errorMiddleware = require("./middlewares/errors");
const ErrorHandler = require("./utils/errorHandler");

dotenv.config({ path: "./config/confing.env" });
process.on("uncaughtException", (err) => {
  process.exit(1);
});
const connectDatabase = require("./config/database");
connectDatabase();
app.use(express.json());
app.use("/api/v1", auth);
app.all("*", (req, res, next) => {
  next(new ErrorHandler(`${req.originalUrl} not found`, 404));
});
app.use(errorMiddleware);
const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(
    `server start on port ${process.env.PORT}, in ${process.env.NODE_ENV} mode`
  );
});
//Handling Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  server.close(() => {
    process.exit(1);
  });
});
