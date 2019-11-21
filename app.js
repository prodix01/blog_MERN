const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");

const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use(morgan("dev"));


app.use("/posts", postRoutes);
app.use("/profiles", profileRoutes);
app.use("/users", userRoutes);


