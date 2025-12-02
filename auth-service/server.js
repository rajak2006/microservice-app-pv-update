const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth"); // only once

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/authdb");

app.use("/auth", authRoutes); // use /auth as route prefix

app.listen(4000, () => console.log("Auth service running on port 4000"));

