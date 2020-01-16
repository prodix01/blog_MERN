const express = require("express");
const cors = require("cors");

const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const passport = require("passport");


const userRoutes = require("./routes/users");
const profileRoutes = require("./routes/profiles");
const postRoutes = require("./routes/posts");

dotenv.config();

const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(morgan("dev"));
app.use(passport.initialize());  //initialize : 초기화

require("./config/passport")(passport);


app.use("/posts", postRoutes);
app.use("/profiles", profileRoutes);
app.use("/users", userRoutes);


app.use((error, req,res, next ) => {
   res.status(error.status || 500);
   res.json({
       error : {
           msg : error.message
       }
   });
});

module.exports = app;


