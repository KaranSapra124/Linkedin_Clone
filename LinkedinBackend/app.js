const app = require("express")();
const express = require("express");
const userRoutes = require("./Routes/UserRoutes");
const dbConfig = require("./utils/dbConfig");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
dbConfig();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use("/user", userRoutes);

app.listen(3000, () => console.log("Server Running!"));
