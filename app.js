const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const connectToDB = require("./config/db");
const userRouter = require("./routes/user.routes");
connectToDB();
const cookieParser=require('cookie-parser')
const app = express();
const indexRouter = require('./routes/index.routes')


app.set("view engine", "ejs");
app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/' ,indexRouter)
app.use("/user", userRouter);

// Default route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
