const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_DB,
        {
            useNewUrlParser : true,
            useUnifiedTopology : true,
            useCreateIndex : true
        }
    )
    .then(() => console.log("mongoDB server started"))
    .catch(err => console.log(err.message));