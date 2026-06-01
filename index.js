const express = require("express");
const app = express();
const path = require("path");
const PORT = 8001;
const cookieParser = require("cookie-parser");
const { connectToMongoDb } = require("./connect");
const URL = require("./models/url");
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");
const { restrictToLoggedInUserOnly } = require("./middlewares/auth");

connectToMongoDb("mongodb://127.0.0.1:27017/shortUrl").then(() => {
  console.log("MongoDb Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`Server Started on PORT: ${PORT}`);
});
