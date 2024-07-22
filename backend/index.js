require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const {
  invalidPathHandler,
  errorResponserHandler,
} = require("./middlewares/errorHandler");

const audiobookRouter = require("./routes/audiobook");
const reviewRouter = require("./routes/review");

const PORT = Number(process.env.PORT) || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("Welcome to kuku fm server!");
});

// routes
app.use("/api/audiobook", audiobookRouter);
app.use("/api/review", reviewRouter);

// to handle errors
app.use(invalidPathHandler);
app.use(errorResponserHandler);

app.listen(PORT, () => console.log(`Server is listening on ${PORT}...`));
